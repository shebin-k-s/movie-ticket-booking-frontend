import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { SocketProvider } from './socket/socket'

type Props = {}

const App = (_: Props) => {
  return (
    <BrowserRouter>
      <SocketProvider />

      <AppRoutes />
    </BrowserRouter>
  )
}

export default App