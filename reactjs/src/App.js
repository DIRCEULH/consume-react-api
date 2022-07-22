import './App.css'
import api from './services/api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function App() {
  const [employees, setEmployees] = useState()

  useEffect(() => {
    api
      .get('/employees')
      .then(response => setEmployees(response.data))
      .catch(err => {
        console.error('ops! ocorreu um erro' + err)
      })
  }, [])

  return (
    <div class="styled-table">
      <table>
        <thead>
          <tr>
            <th>Código:</th>
            <th>Descrição:</th>
            <th>Tamanho:</th>
            <th>EQuantidade:</th>
            <th>Data:</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map(employee => {
              const date = new Date(employee.pr_datcri)

              const formattedDate = format(date, 'dd/MM/yyyy')

              return (
                <tr>
                  <td> {employee.pr_codpro}</td>
                  <td>{employee.pr_descri}</td>
                  <td>{employee.pr_tamanh}</td>
                  <td>{employee.pr_estatu}</td>
                  <td> {formattedDate}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
