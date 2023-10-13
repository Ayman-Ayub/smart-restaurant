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
import { Link } from 'react-router-dom';
import { firestore } from "../firebase.config";
const BookingTable = () => {
  const [filter, setFilter] = useState("");
  const [id, setId] = useState("");
  const [tableid, settableId] = useState("");
  const [bookingtime, setBookingtime] = useState("");
  const [bookingdate, setBookingdate] = useState("");
  const [search, setSearch] = useState("");
  const [datee, setDatee] = useState("");
  const [time, setTime] = useState("");
  const [etime, seteTime] = useState("");

  const [date, setDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [booked, setBooked] = useState("");
  const [TableValue, setTableValue]=useState()
  const [Booking, setBooking]=useState()
  const [bookingexist, setBookingexist]=useState("")
 
  const bookingexistid =[];

  const getAllTable = async () => {
    const items = await getDocs(
      query(collection(firestore, "Table"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setTableValue(items.docs.map((doc) => doc.data()));
  };

  const getAllBooking = async () => {
    const items = await getDocs(
      query(collection(firestore, "Booking"))
      
    );
  
    setBooking(items.docs.map((doc) => doc.data()));
   
  };
  console.log(tableid,bookingdate,bookingtime)
  
  const detail = async (title,id) => {
    setId(id);
      setFilter(title);
  };
  console.log(booked,time,datee)

  const searchtable =()=> {
    setDate(datee)
    setStartTime(time)
    setEndTime(etime)
    Booking.map((val)=>{
      settableId(val.tableid)
      setBookingdate(val.date)
      setBookingtime(val.starttime)
        TableValue.filter((item)=> {  
                    
      val.date == date && val.starttime == starttime && val.endtime == endtime && item.id == val.tableid && (
     
        setBookingexist(val.tableid)
     
       
        )
       } )
      })
console.log(bookingexist)
  }
  useEffect(() => {
    getAllTable()
   getAllBooking()
  
  }, []);
  return (
    <div className='w-full h-screen bg-primary'>
      <div className='flex flex-row py-5 mx-20 bg-white justify-center items-center'>
      <div className='flex flex-col'>
<p className='mx-5 my-3 text-xl text-headingColor font-serif font-bold'>Date</p>
<input type="date" placeholder='' className='mb-5 mx-5 px-6 py-4 bg-primary' value={datee} onChange={(e)=>setDatee(e.target.value)}/>
      </div>
      <div className='flex flex-col'>
<p className='mx-5 my-3 text-xl text-headingColor font-serif font-bold'>Start Time</p>
        <input type="time" placeholder='' className='mb-5 mx-5  px-10 py-4 bg-primary' value={time} onChange={(e)=>setTime(e.target.value)}/>
       </div>
       <div className='flex flex-col'>
<p className='mx-5 my-3 text-xl text-headingColor font-serif font-bold'>End Time</p>
        <input type="time" placeholder='' className='mb-5 mx-5  px-10 py-4 bg-primary' value={etime} onChange={(e)=>seteTime(e.target.value)}/>
       </div>
        <button className='mb-5 mt-12 mx-5  px-14 py-4 bg-orange-500' onClick={()=>searchtable()}>Search</button>
      </div>
      <div className='xl:flex xl:flex-row lg:flex lg:flex-row'>
        <div className='xl:w-1/5 sm:w-[50%] m-10 ml-20 bg-orange-100'>
        <h1 className='pl-5 text-xl pt-5'>Table</h1>
        <div className="w-full py-2 pl-10 text-lg h-full border-gray-300 ">
        
          <input
          type="radio"
          name="group1"
          value="2"
          checked={booked === "2" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         2 seats
         <br />
        <input
          type="radio"
          name="group1"
          value="4"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         4 seats
        <br />
        <input
          type="radio"
          name="group1"
          value="6"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         6 seats
        <br />
        <input
          type="radio"
          name="group1"
          value="8"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
          8 seats
        <br />
       
        </div>
        </div>
         <div className='w-[80%] mr-20 xl:flex xl:flex-row mt-10  p-10 bg-white'>
         <div className='xl:w-[45%]  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3.5  m-2 p-10 rounded-lg bg-primary'>
         {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              booked ? ( 
                 category.seats == booked && (
                  date && starttime ? (
                   
                     
                    Booking.map((val)=>(
                     
                     val.date == date && val.starttime == starttime && val.endtime == endtime && val.tableid == category.id ? (
              
              <div 
              className='w-22 h-20 bg-orange-200 text-heading'  >
              
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            ) : (
              <div
                onClick={() => {detail(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            )
                    ))
         
                  ):(
                    <div
                onClick={() => {detail(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
                  )
              )):(
                date && starttime ? (

                  bookingexist === category.id 
                  ? (
              
              <div 
              className='w-22 h-20 bg-orange-200 text-heading'  >
              
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            ):(
              <div
                onClick={() => {detail(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            )
              
                
                ):(
                  <div
                onClick={() => {detail(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
                )
              )
            
             
                
              
             
            )
           
            
            )
         ):(<div></div>)}
         </div>
         <div className='xl:w-[20%] mx-5 mt-20 gap-6 flex flex-col'>
            <div className='flex flex-row gap-2'>
              <div className='w-8 h-8 bg-orange-200'></div>
              <p>Booked</p>
            </div>

            <div className='flex flex-row gap-2'>
              <div className='w-8 h-8 bg-orange-500'></div>
              <p>Vacant</p>
            </div>
         </div>



         {/* {Booking && Booking?.length > 0 ? (
            Booking.map((category) => ( */}
<div>
            {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              category.id === id && (
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
             <Link to={`/bookingtable/bookingpayment/${category.id}/${date}/${starttime}/${endtime}`}>
            <button className='my-5 mx-5  px-14 py-4 bg-orange-500'>Continue</button>
            </Link>
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
    </div>
  )
}

export default BookingTable