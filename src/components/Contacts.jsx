import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    const swalWithButtons = Swal.mixin({
    customClass: {
    confirmButton: 'bg-green-600 text-white px-5 py-1 rounded shadow-lg',
    cancelButton: 'bg-red-600 text-white px-5 py-1 rounded shadow-lg mr-4'
    },
    buttonsStyling: false
    })

    const getContacts = async() => {
        const {data} = await axios.get('http://localhost:3000/contacts')
        setContacts(data)
    }

    const apiDeleteContact = async(id) => {

    swalWithButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
    }).then(async(result) => {
    if (result.isConfirmed) {
    swalWithButtons.fire(
    'Deleted!',
    'Your file has been deleted.',
    'success'
    );
    
    const {data} = await axios.delete(`http://localhost:3000/contacts/${id}`);
    getContacts(data);
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
    })
    }

    useEffect(()=>{
        getContacts();
    },[]); 

return (
    <>
    <Link to="/create">
        <button className='text-white bg-gray-800 p-2 rounded my-5'>Create New Contact</button>
    </Link>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email Address
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                          Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                {contacts?.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                    {contact.name}
                </td>
                <td className="px-6 py-4">
                    {contact.email}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {contact.phone}
                </td>
                <td className="px-6 py-4 flex gap-3">
                    <Link to={`/edit/${contact.id}`}>
                        <AiFillEdit className='text-xl text-green-600 cursor-pointer'/>
                    </Link>
                    <AiFillDelete onClick={() => apiDeleteContact(contact.id)} className='text-xl text-red-600 cursor-pointer'/>
                </td>
                </tr> 
                ))}    
              </tbody>
          </table>
        </div>
    </>
)
}

export default Contacts