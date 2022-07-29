import './App.css'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Home from './components/Home'

export default function App() {
  const options = {
    timeout: 3000,
    position: positions.BOTTOM_TOP
  }

  return (
    <Provider template={AlertTemplate} {...options}>
      <Home />
    </Provider>
  )
}
