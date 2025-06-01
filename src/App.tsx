import { BrowserRouter } from 'react-router-dom'
import './styles/styles.less'
import { THEME_ANTD_CONFIG } from './styles/theme'
import RouteApp from './route'

function App() {

  return (
      <BrowserRouter>
          <RouteApp />
      </BrowserRouter>
  ) 
}

export default App
