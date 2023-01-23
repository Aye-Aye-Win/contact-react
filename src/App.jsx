import React from 'react'
import Contacts from './components/Contacts'
import Create from './components/Create'
import Edit from './components/Edit'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div className='container mx-auto'>
      <Routes>
        <Route path='/' exact element={<Contacts/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  )
}

export default App