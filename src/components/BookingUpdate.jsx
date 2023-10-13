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
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
  MdDinnerDining,
  MdPriceChange,
  MdDining,
  MdEventSeat,
  MdTitle,
  MdTimeToLeave,
  MdDateRange,
} from "react-icons/md";
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useStateValue } from "../context/StateProvider";
import { IoMdPricetag, IoMdTimer } from 'react-icons/io';

const BookingUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams();
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState("");
  const [booked, setBooked] = useState("");
  const [advance, setAdvance] = useState("");
  const [datee, setDate] = useState("");
  const [time, setTime] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodCategory }, dispatch] = useStateValue();
console.log(id,datee,time)
const [TableValue, setTableValue]=useState()
const [Booking, setBooking]=useState()
const getAllBooking = async () => {
  const items = await getDocs(
    query(collection(firestore, "Booking"))
  
  );

  setTableValue(items.docs.map((doc) => doc.data()));
};

const updatetable = async (uid) => {
     
    let userArray = {};
  
   
                if (!title ||  !datee || !time) {
                  setFields(true);
                  setMsg("Required fields can't be empty");
                  setAlertStatus("danger");
                  setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                  }, 4000);
                }
                  else{
                    userArray = {
                      tabletitle: title,
                      date: datee,
                      starttime:time,
                     
                    };
     const updatedocument = doc(firestore, "Booking", uid);
    await updateDoc(updatedocument, userArray);
    clearData();
    setFields(true);
    setMsg("updated successfully 😊")
    setTimeout(() => {
      setFields(false);
    }, 4000);
    navigate("/showbooking")
  }
    // window.location.reload(true);
    // console.log("updated",userArray,uid)
  };

//   {TableValue?.map((item)=>(
//     date && time & (
//         item.date === date && time === item.starttime && title === item.tabletitle  && (
//             setMsg("already booked table at that time")
//         )
//     )
// ))}

  const clearData = () => {
    setTitle("");
    setTime("");
    setDate("");
    setSeats("");
   
  };

  useEffect(() => {
    getAllBooking()
  
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center bg-primary justify-center">

    
     {TableValue?.map((item)=>(
        item.id === id && (
      <div className="w-[90%] md:w-[50%] border bg-primary border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
      
      <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDateRange className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={item.tabletitle}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDateRange className="text-xl text-gray-700" />
          <input
            type="date"
            required
            value={datee}
            onChange={(e) => setDate(e.target.value)}
            placeholder={item.date}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <IoMdTimer className="text-xl text-gray-700" />
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder={item.starttime}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
      

      
        {/* <input type="date" placeholder='' className='my-5 mx-5 px-6 py-4 bg-primary' value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input type="time" placeholder='' className='my-5 mx-5  px-10 py-4 bg-primary' value={time} onChange={(e)=>setTime(e.target.value)}/> */}
        <div className="flex flex-row justify-center gap-5">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
           onClick={() => updatetable(item.id)}
          >
            Save Booking Details
          </button>
         
        </div>
      </div>
     )
     ))}
    </div>
  );
};

export default BookingUpdate;
