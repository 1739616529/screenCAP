
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { stores, StoresContext } from './store'
import Home from './page/Home/Home'
console.log(stores)
console.log(StoresContext)
function App() {

  return (
    <div className="App">
      <Provider {...stores}>
        <StoresContext.Provider value={stores}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </StoresContext.Provider>
      </Provider>
    </div>
  )
}

export default App
