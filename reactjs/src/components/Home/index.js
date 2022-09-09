import axios from 'axios'
import api from '../../services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa'
import { useAlert } from 'react-alert'

export default function Home() {
  const [employeesData, setEmployeesData] = useState()
  const [isConsult, setIsConsult] = useState(true)
  const [quanty, setQuanty] = useState(0)
  const [description, setDescription] = useState()

  const alert = useAlert()

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
                [curr.id]: {
                  id: curr.id,
                  content: curr.content,
                  quanty: curr.quanty,
                  updatedAt: curr.updatedAt,
                  createdAt: curr.createdAt,
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

  const alertconfirm = id => {
    confirmAlert({
      title: `Você realmente deseja excluir? `,
      message: `Código: ${id}`,
      color: 'green',
      background: '#ddd',
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteDataFinish(id)
        },
        {
          label: 'Não'
        }
      ]
    })
  }

  const onDescription = (id, description) => {
    setEmployeesData({
      ...employeesData,
      [id]: { ...employeesData[id], content: description }
    })
  }

  const deleteData = async product => {
    alertconfirm(product)
  }

  const deleteDataFinish = async product => {
    await axios.delete(`http://localhost:3001/product`, {
      params: { id: product }
    })
    setIsConsult(true)
  }

  const saveData = async (id, description) => {
    if (employeesData[id].isEdit) {
      await axios.put(`http://localhost:3001/description/${id}/${description}`)
      setIsConsult(true)
      alert.success('Alterado com sucesso!')
    } else {
      alert.error('Nada Alterado!')
    }
  }

  const insertData = async (quanty, description) => {
    if (!description) {
      alert.error(`Campo Descricao Obrigatório!!`)
      return
    }
    if (!quanty) {
      alert.error(`Campo Quantidade Obrigatório!!`)
      return
    }
    await axios.post(
      `http://localhost:3001/insertProduct/${quanty}/${description}`
    )
    setDescription('')
    setQuanty(0)
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
      <div style={{ width: '46.7%' }} className="divContent">
        <input
          id={'product'}
          value={description}
          className="inputText"
          placeholder={'Digite a descrição do produto...'}
          style={{ width: '35%' }}
          onChange={data => setDescription(data.target.value)}
        ></input>
        <input
          id={'quanty'}
          value={quanty}
          className="inputText"
          placeholder={'Digite a quantidade do produto...'}
          style={{ width: '35%' }}
          onChange={data => setQuanty(data.target.value)}
        ></input>
        <button
          className="button"
          style={{ width: '15%' }}
          onClick={() => insertData(quanty, description)}
        >
          <center>
            <FaSave />
          </center>
        </button>
      </div>
      <table>
        <thead>
          <tr id={'header'}>
            <th>Código:</th>
            <th>Descrição:</th>
            <th>Quantidade:</th>
            <th>Data:</th>
            <th>Excluir:</th>
            <th>Editar:</th>
            <th>Salvar:</th>
          </tr>
        </thead>
        <tbody>
          {employeesData &&
            Object.keys(employeesData).map((key, index) => {
              const employee = employeesData[key]

              const date = new Date(employee.createdAt)

              const formattedDate = format(date, 'dd/MM/yyyy')

              return (
                <tr id={index}>
                  <td>{employee.id}</td>
                  <td style={{ width: '40%' }}>
                    <input
                      className="inputLabel"
                      style={{ width: '75%' }}
                      value={employee.content}
                      onChange={event =>
                        onDescription(employee.id, event.target.value)
                      }
                      disabled={!employee.isEdit}
                    />
                  </td>
                  <td>{employee.quanty}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <center>
                      <FaTrashAlt onClick={() => deleteData(employee.id)} />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaEdit onClick={() => editData(employee.id)} />
                    </center>
                  </td>
                  <td>
                    <center>
                      <FaSave
                        onClick={() => saveData(employee.id, employee.content)}
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
