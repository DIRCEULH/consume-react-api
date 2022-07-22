import './App.css'
import api from './services/api'
import { format } from 'date-fns'
import { useState } from 'react'
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa'
import axios from 'axios'

export default function App() {
  const [employees, setEmployees] = useState()

  api
    .get('/employees')
    .then(response => setEmployees(response.data))
    .catch(err => {
      console.error('ops! ocorreu um erro' + err)
    })

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
          {employees &&
            employees.map(employee => {
              const date = new Date(employee.pr_datcri)

              const formattedDate = format(date, 'dd/MM/yyyy')

              return (
                <tr>
                  <td>{employee.pr_codpro}</td>
                  <td>{employee.pr_descri}</td>
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
