
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home'
function App() {

  return (
    <div className="App w-screen h-screen overflow-hidden " style={{ "minWidth": '500px', "minHeight": '500px' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
