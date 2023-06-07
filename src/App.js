import { Route, Routes } from 'react-router-dom';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Today from './Pages/Today';
import Weekly from './Pages/Weekly';
import { inject } from '@vercel/analytics';
 

function App() {
  inject();
  return(
    <StyleRoot>    
    <Routes>
      <Route exact path='/' element={<Today/>}></Route>
      <Route exact path='/daily' element={<Today/>}></Route>
      <Route exact path='/weekly' element={<Weekly/>}></Route>
    </Routes>
    </StyleRoot>
  )
}

export default Radium(App);
