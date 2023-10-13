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

import { MdEmail, MdLocationCity, MdPhone, MdTitle } from "react-icons/md";
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const UpdateVendor = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorValue, setVendorValue]=useState()
  const getAllVendors = async () => {
    const items = await getDocs(
      query(collection(firestore, "Vendor"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setVendorValue(items.docs.map((doc) => doc.data()));
  };

const updatetable = async (uid) => {
     
    let userArray = {};
  
   
    if (!name ||  !address || !email || !phone) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const userArray = {
          id: `${Date.now()}`,
          name: name,
          address: address,
          email:email,
          phone:phone,
         
         
        };
     const updatedocument = doc(firestore, "Vendor", uid);
    await updateDoc(updatedocument, userArray);
    clearData();
    setFields(true);
    setMsg("updated successfully 😊")
    setTimeout(() => {
      setFields(false);
    }, 4000);
    navigate("/showvendor")
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
    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
   
  };

    useEffect(() => {
   
  getAllVendors()
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center bg-primary justify-center">

    
     {vendorValue?.map((item)=>(
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
          <MdTitle className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={item.name}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdLocationCity className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={item.address}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
      

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdEmail className="text-xl text-gray-700" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={item.email}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdPhone className="text-xl text-gray-700" />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={item.phone}
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

export default UpdateVendor;
