import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
  MdDinnerDining,
} from "react-icons/md";
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

const CreateTable = () => {
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


  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title ||  !booked || !advance || !seats) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const datacategory = {
          id: `${Date.now()}`,
          title: title,
          booked: booked,
          advance:advance,
          seats:seats,
          time: time,
          date: date,
         
        };
        saveTable(datacategory);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

   
  };

 

  const clearData = () => {
    setTitle("");
    setAdvance("");
    setBooked("");
    setSeats("");
   
  };

 
  return (
    <div className="w-full min-h-screen flex items-center bg-primary justify-center">
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
          <MdDinnerDining className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDinnerDining className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Enter Seats Numbers"
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
          <MdDinnerDining className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            placeholder="Enter Advance Payment Price"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        {/* <input type="date" placeholder='' className='my-5 mx-5 px-6 py-4 bg-primary' value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input type="time" placeholder='' className='my-5 mx-5  px-10 py-4 bg-primary' value={time} onChange={(e)=>setTime(e.target.value)}/> */}
        <div className="flex flex-row justify-center gap-5">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save Table Details
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
