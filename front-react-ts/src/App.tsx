

import './App.css'

import GlobalRouter from './routes'
import { Toaster } from "react-hot-toast";



function App() {


  return (
    <>
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 transition-all duration-500"> 
     
      <GlobalRouter />
      <Toaster /> 
    </div>
     
    </>
  )
}

export default App
