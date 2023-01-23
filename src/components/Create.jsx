import React,{useState} from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
 
  const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
  });
 
  const apiCreateContact  = async(contact) => {
    const {data} = await axios.post('http://localhost:3000/contacts',contact);
    Toast.fire({
    icon: 'success',
    title: 'Contact Created!'
    })
    navigate('/');
  }
  
  const onSubmitHandler = e => {
  e.preventDefault();
  const contact = {id: Date.now(), name, email, phone};
  apiCreateContact(contact)
  }

  return (
    <form onSubmit={onSubmitHandler} className='w-96 border-2 p-5 rounded shadow-lg mx-auto mt-[200px]'>
      <h1 className='text-gray-800 text-2xl font-bold'>Create New Contact</h1>
      <div className="">
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
           @
          </div>
          <input onChange={(e)=>setName(e.target.value)} value={name} autoComplete="off" type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"/>
        </div>
      </div> 
      <div className="">
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 ">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
          </div>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} autoComplete="off" type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com"/>
        </div>
      </div>
      <div className="">
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsFillTelephoneFill/>
          </div>
            <input onChange={(e)=>setPhone(e.target.value)} value={phone} autoComplete="off" type="number" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09xxxxxxxxx"/>
        </div>
      </div>
      <button type='submit' className='text-white bg-gray-600 px-4 py-2 rounded shadow-lg text-sm my-5'>CREATE</button>
      <Link to="/">
        <button className="text-white bg-red-500 px-4 py-2 rounded shadow-lg text-sm my-5 ml-4">CANCEL</button>
      </Link>
    </form>
  )
}

export default Create