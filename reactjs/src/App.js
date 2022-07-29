import api from './services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa'
import axios from 'axios'
import './App.css'

export default function App() {
  const [employeesData, setEmployeesData] = useState()
  const [isConsult, setIsConsult] = useState(true)

  useEffect(() => {
    if (isConsult) {
      setIsConsult(false)
      api
        .get('/employees')
        .then(response => {
          setEmployeesData(
            response.data.reduce(
              (acc, curr) => ({
                ...acc,
                [curr.pr_codpro]: {
                  pr_codpro: curr.pr_codpro,
                  pr_descri: curr.pr_descri,
                  pr_tamanh: curr.pr_tamanh,
                  pr_estatu: curr.pr_estatu,
                  pr_datcri: curr.pr_datcri,
                  isEdit: false
                }
              }),
              {}
            )
          )
        })
        .catch(err => {
          console.error('ops! ocorreu um erro' + err)
        })
    }
  }, [isConsult])

  const onDescription = (id, description) => {
    setEmployeesData({
      ...employeesData,
      [id]: { ...employeesData[id], pr_descri: description }
    })
  }

  const deleteData = async product => {
    await axios.delete(`http://localhost:3001/product`, {
      params: { id: product }
    })
    setIsConsult(true)
  }

  const saveData = async (id, description) => {
    await axios.put(`http://localhost:3001/description/${id}/${description}`)
    setIsConsult(true)
  }

  const editData = id => {
    setEmployeesData({
      ...employeesData,
      [id]: { ...employeesData[id], isEdit: true }
    })
  }

  return (
    <div className="styled-table">
      <table>
        <thead>
          <tr>
            <th>Código:</th>
            <th>Descrição:</th>
            <th>Tamanho:</th>
            <th>Quantidade:</th>
            <th>Data:</th>
            <th>Excluir:</th>
            <th>Editar:</th>
            <th>Salvar:</th>
          </tr>
        </thead>
        <tbody>
          {employeesData &&
            Object.keys(employeesData).map(key => {
              const employee = employeesData[key]

              const date = new Date(employee.pr_datcri)

              const formattedDate = format(date, 'dd/MM/yyyy')

              return (
                <tr>
                  <td>{employee.pr_codpro}</td>
                  <td style={{ width: '40%' }}>
                    <input
                      className="inputText"
                      style={{ width: '100%' }}
                      value={employee.pr_descri}
                      onChange={event =>
                        onDescription(employee.pr_codpro, event.target.value)
                      }
                      disabled={!employee.isEdit}
                    />
                  </td>
                  <td>{employee.pr_tamanh}</td>
                  <td>{employee.pr_estatu}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <center>
                      <FaTrashAlt
                        onClick={() => deleteData(employee.pr_codpro)}
                      />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaEdit onClick={() => editData(employee.pr_codpro)} />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaSave
                        onClick={() =>
                          saveData(employee.pr_codpro, employee.pr_descri)
                        }
                      />
                    </center>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
