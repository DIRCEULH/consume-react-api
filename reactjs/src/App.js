import './App.css'
import api from './services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa'
import axios from 'axios'

export default function App() {
  const [employees, setEmployees] = useState()
  const [employeesData, setEmployeesData] = useState()

  useEffect(() => {
    api
      .get('/employees')
      .then(response => {
        setEmployeesData(response.data)
        setEmployees(
          response.data.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.pr_codpro]: {
                pr_codpro: curr.pr_codpro,
                pr_descri: curr.pr_descri,
                pr_tamanh: curr.pr_tamanh,
                pr_estatu: curr.pr_estatu,
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
  })

  const onDescription = (id, description) => {
    console.log('Dirceu:', {
      ...employees,
      [id]: { ...employees[id], pr_descri: description }
    })
    setEmployees({
      ...employees,
      [id]: { ...employees[id], pr_descri: description }
    })
  }

  const detele = async product => {
    const { data } = await axios.delete(`http://localhost:3001/product`, {
      params: { id: product }
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
            employeesData.map(employee => {
              const date = new Date(employee.pr_datcri)

              const formattedDate = format(date, 'dd/MM/yyyy')

              //console.log('Dirceu 2:', employees[employee.pr_codpro].pr_descri)

              return (
                <tr>
                  <td>{employee.pr_codpro}</td>
                  <td style={{ width: '40%' }}>
                    <input
                      style={{ width: '100%' }}
                      value={employees[employee.pr_codpro].pr_descri}
                      onChange={event =>
                        onDescription(employee.pr_codpro, event.target.value)
                      }
                    />
                  </td>
                  <td>{employee.pr_tamanh}</td>
                  <td>{employee.pr_estatu}</td>
                  <td> {formattedDate}</td>
                  <td>
                    <center>
                      <FaTrashAlt onClick={() => detele(employee.pr_codpro)} />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaEdit />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaSave />
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
