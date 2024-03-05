import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Auth from './Auth'
import Authentication from './component/Authentication'
import Navbar from './component/Navbar'
import Home from './component/Home'

function App() {
  return (
    <div>
      {/* <Authentication/> */}
      <BrowserRouter>
      <Navbar/>
         <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/auth" element={<Authentication/>}/>
             {/* <Route path="/create" element={<Authentication/>}/> */}
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App