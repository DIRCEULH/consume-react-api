import { useEffect, useState } from 'react'
import api from './services/api'
import './App.css'

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
            <th>Nome:</th>
            <th>Empresa:</th>
            <th>Cidade:</th>
            <th>Idade:</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map(employee => {
              return (
                <tr>
                  <td> {employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.company}</td>
                  <td>{employee.city}</td>
                  <td>{employee.age}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
