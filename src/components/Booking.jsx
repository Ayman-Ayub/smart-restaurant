
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

import BookingPayment from './BookingPayment';
import { Link, useParams } from 'react-router-dom';
import Payment from './Payment';
import MultiStep from './MultiStep';
import StripeContainer from './StripeContainer';
 const Booking = () => {
    const { idd } = useParams();
    const [TableValue, setTableValue]=useState()
    const [Booking, setBooking]=useState()
    const getAllTable = async () => {
      const items = await getDocs(
        query(collection(firestore, "Table"))
        // query(collection(firestore, "Table"), orderBy("id", "desc"))
      );
    
      setTableValue(items.docs.map((doc) => doc.data()));
    };
    const steps = [
        {title: 'StepOne', component: <BookingPayment id={idd}/>},
        {title: 'StepTwo', component: <Payment id={idd}/>},
        //  {title: 'StepThree', component: <StripeContainer/>},
        // {title: 'StepFour', component: <StepFour/>}
      ];
   return (
     <div className=' w-full  bg-primary'>
        <MultiStep activeStep={1} showNavigation={true} steps={steps}/>
     </div>
   )
 }
 
 export default Booking