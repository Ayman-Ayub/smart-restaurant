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
import { firestore } from "../firebase.config";
import { Link, useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Formik } from 'formik';
import { useStepperContext } from "../context/StepperContext";
const BookingPayment = (id) => {
  const { userData, setUserData } = useStepperContext();
  console.log(userData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
    const { idd ,date,starttime,endtime} = useParams();
  const [filter, setFilter] = useState("");
 console.log(id,idd,starttime,endtime)
  const [search, setSearch] = useState("");
  
  const [booked, setBooked] = useState("");
  const [TableValue, setTableValue]=useState()
  const [Booking, setBooking]=useState()
  const getAllTable = async () => {
    const items = await getDocs(
      query(collection(firestore, "Table"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setTableValue(items.docs.map((doc) => doc.data()));
  };

  
  const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: idd})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }
 
  useEffect(() => {
    getAllTable()
  
  
  }, []);
  return (
    <div className='w-full  bg-primary px-20 pt-20'>
    
    
         <div className='  xl:flex xl:flex-row  p-10 bg-white w-full'>
       <div className='flex flex-col w-[80%] '>
         <div className=' flex flex-col    gap-3.5  m-10 p-10 rounded-lg bg-primary'>
        <h1 className='text-2xl font-semibold '>Contact Details</h1>
        <div className='flex flex-row '>
        <div className=' flex flex-col '>
            <h1>Mobile Number</h1>
            <input
            required
            type="tel"
            name='phone'
            onChange={handleChange}
            value={userData["phone"] || ""}
          className='h-10 border-1 border-black p-3'
          placeholder='Enter Phone...'
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        />
            {/* <PhoneInput
            required
            
          country={'pk'}
          onChange={handleChange}
            value={userData["phone"] || ""}
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        /> */}
        </div>
        <div className=' flex flex-col ml-10'>
            <h1>Email</h1>
            <input
            required
            type="email"
            name='email'
            onChange={handleChange}
            value={userData["email"] || ""}
          className='h-10 border-1 border-black p-3'
          placeholder='Enter Email...'
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        />
        </div>
        </div>
         </div>


         <div className=' flex flex-col   gap-3.5  m-10 p-10 rounded-lg bg-primary'>
        <h1 className='text-2xl font-semibold '>Booking Details</h1>
       
       
        <div className=' flex flex-col'>
            <h1>First Name</h1>
            <input
            required
            name='fname'
            onChange={handleChange}
            value={userData["fname"] || ""}
            type="text"
          className='h-10 border-1 border-black p-3'
          placeholder='Enter First Name...'
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        />
        </div>
        <div className=' flex flex-col'>
            <h1>Last Name</h1>
            <input
            required
            name='lname'
            onChange={handleChange}
            value={userData["lname"] || ""}
            type="text"
          className='h-10 border-1 border-black p-3'
          placeholder='Enter Last Name...'
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        />
        </div>
       

        <div className=' flex flex-col'>
            <h1>Date of Birth</h1>
            <input
            required
            name='dob'
            onChange={handleChange}
            value={userData["dob"] || ""}
            type="date"
          className='h-10 w-[50%] border-1 border-black p-3'
         
        //   value={this.state.phone}
        //   onChange={phone => this.setState({ phone })}
        />
        </div>
        {/* <Link to={`/payment/${idd}`}> */}
        {/* <button className='my-5 mx-5  px-14 py-4 bg-orange-500' onClick={checkout}>Continue</button> */}
        {/* </Link> */}
         </div>
      
</div>


         {/* {Booking && Booking?.length > 0 ? (
            Booking.map((category) => ( */}
<div>
            {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              category.id === idd && (
         <div className=' mt-10 p-5 border-headingColor border-2 gap-6 flex flex-col'>
         
         <div className='flex flex-row gap-2'>
             
              <h1>Table : </h1>
              <p className='text-xl font-semibold items-center '>{category.title}</p>
            </div>
            <div className='flex flex-row gap-2'>
             
             <h1>Date : </h1>
             <p className='text-xl font-semibold items-center '>{date}</p>
           </div>
           <div className='flex flex-row gap-2'>
             
             <h1>Start Time : </h1>
             <p className='text-xl font-semibold items-center '>{starttime}</p>
           </div>

           <div className='flex flex-row gap-2'>
             
             <h1>End Time : </h1>
             <p className='text-xl font-semibold items-center '>{endtime}</p>
           </div>

            <div className='flex flex-row gap-2'>
             
            <h1>Advance Booking : </h1>
              <p className='text-xl font-semibold  items-center '>{category.advance}</p>
            </div>
            <div className='flex flex-row gap-2'>
             
             <h1>Total Payment : </h1>
               <p className='text-xl font-semibold  items-center '>{category.advance}</p>
             </div>

           
         </div>
            )
           )
         )
         ):(
          <div></div>
         )
         }
         </div>
         </div>
     
    </div>
  )
}

export default BookingPayment