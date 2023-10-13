import React, { useEffect, useState,useRef } from 'react'
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
import { Link } from 'react-router-dom';
import { firestore } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import html2canvas from 'html2canvas';
const UserBooking = () => {
    const qrRef = useRef([]);
    let refs = useRef([React.createRef(), React.createRef()]);
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
    const [Booking, setBooking]=useState()
    const getAllBooking = async () => {
        const items = await getDocs(
          query(collection(firestore, "Booking"))
          
        );
      
        setBooking(items.docs.map((doc) => doc.data()));
      
      };
    
      const downloadinfo =async (e) => {
      e.preventDefault();
    const element = qrRef.current;
    const canvas = await html2canvas(element);
    let image = canvas?.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
  };

      useEffect(() => {
       
       getAllBooking()
      
      }, []);
  return (
    <div className='w-full h-full bg-primary p-10'>
      {Booking?.map((item,ind)=>(
        item.userData.email === user.email && (
            <div>
            <div  ref={qrRef} className='flex flex-col bg-orange-100 m-20 p-10' >
            <div className='mb-10 flex flex-row justify-between'>
              <h1 className='text-2xl font-bold text-orange-600'>
                Booking Info
              </h1>
              <div>
              <button className='bg-orange-600 text-white text-lg font-medium px-10 py-3' type="submit" 
               onClick={downloadinfo}>
            Download
          </button>
          <ReactToPrint content={() => qrRef.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <button className='bg-orange-600 text-white text-lg font-medium px-10 py-3 ml-3' onClick={handlePrint}>Print this out!</button>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
         </div>
              </div>
              <div className='flex flex-row'>
                <div className='flex flex-col'>
                <p className='text-lg font-medium text-headingColor px-10'>Name : </p>
                <p className='text-lg font-medium text-headingColor px-10'>Mobile No : </p>
                <p className='text-lg font-medium text-headingColor px-10'>Table :</p>
                <p className='text-lg font-medium text-headingColor px-10'>Date :</p>
                <p className='text-lg font-medium text-headingColor px-10'>Time :</p>
                </div>

                <div className='flex flex-col'>
                <p className='text-xl font-medium text-headingColor  px-10'>{item.userData.fname} <span> {item.userData.lname}</span></p>
                <p className='text-lg font-medium text-headingColor px-10'>{item.userData.phone}</p>
                <p className='text-lg font-medium text-headingColor px-10'>{item.tabletitle}</p>
                <p className='text-lg font-medium text-headingColor px-10'>{item.date}</p>
                <p className='text-lg font-medium text-headingColor px-10'>{item.starttime} <span>to</span> {item.endtime}</p>


                </div>
                </div>
            </div>
            </div>
        )
      ))}
    </div>
  )
}

export default UserBooking