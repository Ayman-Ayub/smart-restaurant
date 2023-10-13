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
} from "react-icons/md";
import { useParams } from 'react-router-dom';

import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveTable, } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { IoMdPricetag } from 'react-icons/io';

const TableUpdate = () => {
    const { id } = useParams();
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState("");
  const [booked, setBooked] = useState("");
  const [advance, setAdvance] = useState("");
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodCategory }, dispatch] = useStateValue();
console.log(id)
const [TableValue, setTableValue]=useState()
const [Booking, setBooking]=useState()
const getAllTable = async () => {
  const items = await getDocs(
    query(collection(firestore, "Table"), where("id", "==", id))
  
  );

  setTableValue(items.docs.map((doc) => doc.data()));
};

const updatetable = async (uid) => {
     
    let userArray = {};
    if (!title ||  !booked || !advance || !seats) {
      userArray = {
        title: title,
        booked: booked,
        advance:advance,
        seats:seats,
      };
    }
    if (title ||  !booked || !advance || !seats) {
      userArray = {
        title: title,
      };
    }
    if (!title ||  booked || !advance || !seats) {
      userArray = {
        booked: booked,
      };
    }
    if (!title ||  !booked || advance || !seats) {
      userArray = {
        advance:advance,
      };
    }
    if (title ||  !booked || !advance || seats) {
      userArray = {
        seats:seats,
      };
    }
    if (title ||  booked || !advance || !seats) {
      userArray = {
        title: title,
        booked: booked,
      };
    }
    if (!title ||  booked || advance || !seats) {
      userArray = {
        booked: booked,
        advance:advance,
      };
    }
    if (!title ||  !booked || advance || seats) {
      userArray = {
        advance:advance,
        seats:seats,
      };
    }
    if (title ||  !booked || !advance || seats) {
      userArray = {
        title: title,
        seats:seats,
      };
    }
    if (title ||  booked || advance || !seats) {
      userArray = {
        title: title,
        booked: booked,
        advance:advance,
      };
    }
    if (!title ||  booked || advance || seats) {
      userArray = {
        booked: booked,
        advance:advance,
        seats:seats,
      };
    }
    if (title ||  !booked || advance || seats) {
      userArray = {
        title: title,
        advance:advance,
        seats:seats,
      };
    }
    if (title ||  booked || !advance || seats) {
      userArray = {
        booked: booked,
        title: title,
        seats:seats,
      };
    }
     const updatedocument = doc(firestore, "Table", uid);
    await updateDoc(updatedocument, userArray);
    clearData();
    setFields(true);
    setMsg("updated successfully 😊")
    setTimeout(() => {
      setFields(false);
    }, 4000);
    // window.location.reload(true);
    // console.log("updated",userArray,uid)
  };



  const clearData = () => {
    setTitle("");
    setAdvance("");
    setBooked("");
    setSeats("");
   
  };

  useEffect(() => {
    getAllTable()
  
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center bg-primary justify-center">
     {TableValue?.map((item)=>(
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={item.title}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdEventSeat className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder={item.seats}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDinnerDining className="text-xl text-gray-700" />
          <input
          type="radio"
          name="group1"
          value="True"
          checked={booked === "True" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
        Booked <br />
        <input
          type="radio"
          name="group1"
          value="False"
          checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
        Not Booked
        <br />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <IoMdPricetag className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            placeholder={item.advance}
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
            Save Table Details
          </button>
         
        </div>
      </div>
     ))}
    </div>
  );
};

export default TableUpdate;
