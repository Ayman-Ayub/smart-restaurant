import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "../styles/venor.css"
import { useState } from "react";
import { saveVendor, } from "../utils/firebaseFunctions";
import { MdEmail, MdLocationCity, MdPhone, MdTitle } from "react-icons/md";


// And now we can use these
const SignupForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  const saveDetails = () => {
    if (!name ||  !address || !email || !phone) {
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
          name: name,
          address: address,
          email:email,
          phone:phone,
         
         
        };
        saveVendor(datacategory);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    }

      const clearData = () => {
    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
   
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
          <MdTitle className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name of vendor"
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
            placeholder="Address"
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
            placeholder="Enter email"
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
            placeholder="Enter Phone No"
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

function CreateVendor() {
  return <SignupForm />;
}


export default CreateVendor;