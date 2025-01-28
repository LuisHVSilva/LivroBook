// Infrastructure
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

// Styles Sass
import './sass/main.sass'

// Pages
import './pages/User/UserRegister'
import UserRegister from './pages/User/UserRegister'

function App() {

  return (
    <>      
      <BrowserRouter>        
          <Routes>            
            <Route path="/user/register" element={<UserRegister />} />            
            {/* 404 */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>        
      </BrowserRouter>
    </>
  )
}

export default App
