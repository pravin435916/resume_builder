import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Auth from './Auth'
import Authentication from './component/Authentication'
import Navbar from './component/Navbar'
import Home from './component/Home/Home'
import CreateTemplate from './component/CreateTemplate'
import ResumeDetail from './component/Resume/ResumeDetail'

function App() {
  return (
    <div>
      {/* <Authentication/> */}
      <BrowserRouter>
      {/* <Navbar/> */}
         <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/auth" element={<Authentication/>}/>
             <Route path="/create" element={<CreateTemplate/>}/>
             <Route path="/image/:imageName" element={<ResumeDetail />} />
             {/* <Route path="/resume" element={<Resume/>}/> */}
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App