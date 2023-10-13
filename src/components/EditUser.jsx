import React, {useState} from 'react'
import "../styles/Login.css"
import "../styles/dark.css"
import "../styles/headline.css"
import "../styles/inputField.css"
import { motion } from "framer-motion";
import PasswordChecklist from "react-password-checklist"
import * as yup from "yup"
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

import Loader from "./Loader";
import { app } from "../firebase.config";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { NavLink , useNavigate} from "react-router-dom";
import img1 from '../img/logo.png'
import { FaFile,FaTextWidth,FaLaptopCode } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff } from "react-icons/io";
import { storage } from "../firebase.config";
import {saveUser,getAllUser } from "../utils/firebaseFunctions";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where 
} from "firebase/firestore";
import { firestore } from "../firebase.config";

import InputField from '../components/InputField';
import Avatar from "../img/avatar.png";
import { useEffect } from 'react';

const EditUser = () => {
  const [{ user, cartShow, cartItems }] = useStateValue();
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setuserData] = useState([]);
    const [emailupdate, setEmailupdate] = useState('');
    const [nameupdate, setNameupdate] = useState('');
   const [getemailupdate, setgetemailupdate]=useState('');
   const [err, setErr] = useState(false);
    const [passwordupdate, setPasswordupdate] = useState('');
    
    const addrefUser = query(collection(firestore, "User"), where("email", "==", user.email));
    const uploadImage = (e) => {
      setIsLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          setFields(true);
          setMsg("Error while uploading : Try AGain 🙇");
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL);
            setIsLoading(false);
            setFields(true);
            setMsg("Image uploaded successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
              setFields(false);
            }, 4000);
          });
        }
      );
    };
    const deleteImage = () => {
      setIsLoading(true);
      const deleteRef = ref(storage, imageAsset);
      deleteObject(deleteRef).then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    };
    const updateuser = async (uid) => {
     
      let userArray = {};
      if (emailupdate !== "" && passwordupdate !== "" && nameupdate !== "" &&  imageAsset !== "") {
        userArray = {
          email: emailupdate,
          password: passwordupdate,
          name: nameupdate,
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate === "" && nameupdate === "" &&  imageAsset === "") {
        userArray = {
          email: emailupdate,
        };
      }
      if (emailupdate === "" && passwordupdate !== "" && nameupdate === "" &&  imageAsset === "") {
        userArray = {
          password: passwordupdate,
        };
      }
      if (emailupdate === "" && passwordupdate === "" && nameupdate !== "" &&  imageAsset === "") {
        userArray = {
          name: nameupdate,
        };
      }
      if (emailupdate === "" && passwordupdate === "" && nameupdate === "" &&  imageAsset !== "") {
        userArray = {
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate !== "" && nameupdate === "" &&  imageAsset  === "") {
        userArray = {
          email: emailupdate,
          password: passwordupdate,
        };
      }
      if (emailupdate === "" && passwordupdate !== "" && nameupdate !== "" &&  imageAsset  === "") {
        userArray = {
          name: nameupdate,
          password: passwordupdate,
        };
      }
      if (emailupdate === "" && passwordupdate === "" && nameupdate !== "" &&  imageAsset !== "") {
        userArray = {
          name: nameupdate,
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate === "" && nameupdate === "" &&  imageAsset !== "") {
        userArray = {
          email: emailupdate,
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate !== "" && nameupdate !== "" &&  imageAsset === "") {
        userArray = {
          email: emailupdate,
          name: nameupdate,
          password: passwordupdate,
        };
      }
      if (emailupdate === "" && passwordupdate !== "" && nameupdate !== "" &&  imageAsset !== "") {
        userArray = {
          name: nameupdate,
          password: passwordupdate,
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate === "" && nameupdate !== "" &&  imageAsset !== "") {
        userArray = {
          name: nameupdate,
          email: emailupdate,
          imageURL: imageAsset,
        };
      }
      if (emailupdate !== "" && passwordupdate !== "" && nameupdate === "" &&  imageAsset !== "") {
        userArray = {
          password: passwordupdate,
          email: emailupdate,
          imageURL: imageAsset,
        };
      }
       const updatedocument = doc(firestore, "User", uid);
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
      setNameupdate("");
      setEmailupdate("");
      setPasswordupdate("");
      setImageAsset(null);
     
    };
    const getUser = async () => {
      const getData = await getDocs(addrefUser);
      console.log(getData);
      setuserData(getData.docs.map((doc) => ({ id: doc.id })));
      console.log(userData);
    };
    useEffect(() => {
      getUser();
    }, []);


    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
      const json = localStorage.getItem("site-dark-mode");
      const currentMode = JSON.parse(json);
      if (currentMode) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }, []);
  
    React.useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      const json = JSON.stringify(darkMode);
      localStorage.setItem("site-dark-mode", json);
    }, [darkMode]);
  return (
    <div className="w-full h-screen  flex justify-center login">

      <div className='' >
     
     <div>
     <div className="headline" >
      {/* <div className="center-container">
        Welcome Back
       
      </div> */}
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
      {/* <p className="paraLine" >
      Login to continue using account
      </p> */}
    </div>
    </div>
        <div className="login_container lg:w-[900px] lg:max-h-fit">

            
            
              <div>
            
              <div className="upload group flex justify-center lg:ml-40 md:ml-40 sm:ml-40 items-center flex-col border-2 border-solid  w-44 h-40 cursor-pointer rounded-lg border-[#ea580c] uploadimg">
         
              {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-40 flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 color-[#ea580c]" />
                      <p className="text-gray-500 hover:text-gray-700">
                    Upload your image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
         
        </div>  
              {/* <InputField
            icon={FaFile}
            name="image"
            type="file"
         
            placeholder="Select image"
            value={imageAsset}
            changeHandler={uploadImage}
            
          /> */}

          <InputField
            icon={FaEnvelope}
            name="Name"
            type="Name"
            placeholder="Change Name" 
            value={nameupdate}
             changeHandler={e=>setNameupdate(e.target.value)}
          />   
          
                {/* <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Change email"
            value={emailupdate}
             changeHandler={e=>setEmailupdate(e.target.value)}
          />    */}
                
                <InputField
            icon={GoEllipsis}
            icon2={IoIosEyeOff}
            name="password"
            type="password"
            placeholder="Change password"
            value={passwordupdate}
            changeHandler={e => setPasswordupdate(e.target.value)}
           
          />
           <PasswordChecklist
                rules={["minLength","specialChar",
                        "number","capital"]}
                minLength={8}
                value={passwordupdate}
               
            />
                
                </div>
               
                {/* {userData.map((val,id)=>{ */}

               
                {/* <button type='submit' onClick={() => updateuser(getemails[0])}   className='login_signinButton'>Update</button> */}
                  
              {/* })} */}

                 {userData.map((val,id)=>(

               
                 <button type='submit' onClick={() => updateuser(val.id)}   className='login_signinButton w-56 xl:ml-36 lg:ml-32'> Update</button>
                  
                  ))}

              
            
           
        </div>
    </div>
    </div>
  );
};

export default EditUser;
