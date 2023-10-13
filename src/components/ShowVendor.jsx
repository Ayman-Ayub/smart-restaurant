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
const ShowVendor = () => {
  const navigate = useNavigate()
   
  const [vendorValue, setVendorValue]=useState()

  const getAllVendors = async () => {
    const items = await getDocs(
      query(collection(firestore, "Vendor"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setVendorValue(items.docs.map((doc) => doc.data()));
  };


  

  const deletetable = async (uid) => {
    console.log(uid)
  await deleteDoc(
    doc(firestore, "Vendor",uid)
  );
  
 
  window.location.reload(true)
  
};


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

const onSave = (id) => {
  Swal.fire({
    title: 'Do you want to update the table?',
   
    showCancelButton: true,
    confirmButtonText: 'yes',
    
  }).then((result) => {
    if (result.isConfirmed) {
     navigate(`/showvendor/updatevendor/${id}`)
    }
  })
}

  useEffect(() => {
   
  getAllVendors()
  }, []);
  return (
    <div className='w-full h-full items-center justify-center p-20 bg-primary'>
         <table  className='w-full h-full items-center justify-center  bg-primary'>
              <tr
  
               className='bg-gray-200 w-full justify-between'
              >
                <th>Vendor</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Actions</th>
  
              </tr>
             {vendorValue?.map((val)=>(
                <tr  style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
                
                
              }}>

     
        <td>{val.name}</td>
        <td>{val.address}</td>
        <td>{val.email}</td>
        <td>{val.phone}</td>
        
        <td>
          <div className="flex gap-2">
          <div  >
           <button className="text-white bg-red-500 p-1 justify-center items-center rounded-full w-10 h-10  "
               onClick={()=>onDelete(val?.id)}
           >
          
            <MdDelete
         
            
              className="text-white justify-center items-center  w-8 h-8 "
            />
             </button> 
            
            </div>
            {/* <Link to={`/showbooking/bookingupdate/${val?.id}`}> */}
            <div  className="text-white bg-green-500 p-1 justify-center items-center rounded-full w-10 h-10  "
              onClick={()=>onSave(val?.id)}
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

export default ShowVendor