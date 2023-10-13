import React, { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { firestore } from "../firebase.config";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate()
    const [TableValue, setTableValue]=useState()
  const [Booking, setBooking]=useState()
  const getAllTable = async () => {
    const items = await getDocs(
      query(collection(firestore, "Table"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setTableValue(items.docs.map((doc) => doc.data()));
  };

  const deletetable = async (id) => {
  await deleteDoc(
    doc(firestore, "Table",id)
  );
  
 
  window.location.reload(true)
  
};


const onSave = (id) => {
  Swal.fire({
    title: 'Do you want to update the table?',
   
    showCancelButton: true,
    confirmButtonText: 'yes',
    
  }).then((result) => {
    if (result.isConfirmed) {
     navigate(`/table/tableupdate/${id}`)
    }
  })
}

const onDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    
   cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {

    if (result.isConfirmed) {
      deletetable(id)
     
    }
  })
}

  useEffect(() => {
    getAllTable()
  
  }, []);
  return (
    <div className='w-full  items-center justify-center p-20 bg-primary'>
         <table  className='w-full h-full items-center justify-center  bg-primary'>
              <tr
  
               className='bg-gray-200 w-full justify-between'
              >
                <th>Table</th>
                <th>Seats</th>
                <th>Actions</th>
  
              </tr>
             {TableValue?.map((item)=>(
                <tr  style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
                
                
              }}>

     
        <td>{item.title}</td>
        <td>{item.seats}</td>
        
        <td>
          <div className="flex gap-2">
          <div  >
           <button className="text-white bg-red-500 p-1 justify-center items-center rounded-full w-10 h-10  "
           onClick={()=>onDelete(item?.id)}
              // onClick={(e) => deletetable(item?.id)}
           >
          
            <MdDelete
         
            
              className="text-white justify-center items-center  w-8 h-8 "
            />
             </button> 
            
            </div>
            {/* <Link to={`/table/tableupdate/${item?.id}`}> */}
            <div  className="text-white bg-green-500 p-1 justify-center items-center rounded-full w-10 h-10  "
           onClick={()=>onSave(item?.id)}
            >
            <MdEdit
            //    onClick={() => {  setShowupdatesubCatModal(true) }}
              // type="button"
              className="text-white bg-green-500 rounded-full w-8 h-8  "
            >
             
            </MdEdit>
            </div>
            {/* </Link> */}
          </div>
        </td>
       
      </tr>
            ))}
            </table>
    </div>
  )
}

export default Table