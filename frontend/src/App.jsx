import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => {
  return (
    <div className='App' >
      <Navbar />
      <Routes >
      <Route path='/' element = {<Home/>} />
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/orders' element = {<PlaceOrder/>} />
       

      </Routes>
    </div>
  )
}

export default App