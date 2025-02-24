import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
