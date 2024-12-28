import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,useRoutes} from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import CounterPage from './pages/CounterPage'
import Shopping from './pages/Shopping'

const AppRoutes = ()=>{
  const routes = useRoutes([
    {path:'/',element:<TodoPage/>},
    {path:'/counter',element:<CounterPage/>},
    {path:'/shopping',element:<Shopping/>}
  ])
  return routes
}

function App() {
 

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
