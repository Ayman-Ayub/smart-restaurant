
import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import { useStepperContext } from "../context/StepperContext";
import { saveBooking } from "../utils/firebaseFunctions";
import { loadStripe } from "@stripe/stripe-js";

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

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51MK4SmC9V03HKz1YH67CRxN6i4aiyEiLyETg2gArbcz4Un21vBpwE1tnqhV9J04H0qCzWzmiQSYRTCXDxJ9bkBlK001sLm9KAh');
  }

  return stripePromise;
};

function Payment() {
  const { userData, setUserData } = useStepperContext();
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
    const { idd,date,starttime,endtime } = useParams();
    console.log(idd,starttime)
    const [TableValue, setTableValue]=useState()
    const [Booking, setBooking]=useState()
    const getAllTable = async () => {
      const items = await getDocs(
        query(collection(firestore, "Table"), where("id", "==", idd))
        // query(collection(firestore, "Table"), orderBy("id", "desc"))
      );
    
      setTableValue(items.docs.map((doc) => doc.data()));
      TableValue?.map((item)=>(
        setBooking(item.title)
      ))
      console.log(Booking)
    };
  
    
  
  
   
    useEffect(() => {
      getAllTable()
    
    
    }, []);

  const item = {
    price: "price_1MKHClC9V03HKz1YL0NsCBim",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };
  const redirectToCheckout = async (title) => {
    const datacategory = {
          id: `${Date.now()}`,  
         tableid: idd,
         tabletitle:title,
          date: date ,
          starttime: starttime,
          endtime: endtime,
         userData
        };
saveBooking(datacategory)
console.log("success")

 setUserData(null)
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
   
  };

  if (stripeError) alert(stripeError);
  

  return (
    <div className="bg-primary w-full  p-20">
      <h2>Table Detail</h2>
    
      {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              category.id === idd && (

                <div className=' mt-10 p-5 border-headingColor border-2 gap-6 flex flex-col'>
         
         <div className='flex flex-row gap-2'>
             
              <h1>Table : </h1>
              <p className='text-xl font-semibold items-center '>{category.title}</p>
            </div>

            <div className='flex flex-row gap-2'>
             
             <h1>No of Seats: </h1>
               <p className='text-xl font-semibold  items-center '>{category.seats}</p>
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

           <button onClick={()=>redirectToCheckout(category.title)} className='my-5 mx-5 w-[30%] px-14 py-4 bg-orange-500'>Proceed to pay</button>
        
     
      </div>
       )
       ))
       ):(<div></div>)} 
    </div>
  );
}

export default Payment;