import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
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
import { getAllCategories, saveCategory,getAllFreshCategories,saveFreshCategory } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useParams } from "react-router-dom";
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { firestore } from "../firebase.config";
const UpdateHotCategory = () => {
    const { id } = useParams();
    console.log(id)
  const [title, setTitle] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [food,setfood] = useState()
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodCategory }, dispatch] = useStateValue();
  const getAllCategories = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodCategory"))
    );
  
    setfood(items.docs.map((doc) => doc.data()));
  };
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
        setMsg("Error while uploading : Try AGain ");
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
          setMsg("Image uploaded successfully ");
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
      setMsg("Image deleted successfully ");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const updateuser = async (uid) => {
     
    let userArray = {};
    if (  imageAsset !== "" && title !== "") {
      userArray = {
         title: title,
        imageURL: imageAsset,
      };
    }
    if ( imageAsset === "" && title !== "") {
      userArray = {
        title: title,
      };
    }
    if (  imageAsset !== "" && title === "") {
      userArray = {
        imageURL: imageAsset,
      };
    }
  
  

     const updatedocument = doc(firestore, "foodCategory", uid);
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
    setImageAsset(null);
   
  };
  
  
  useEffect(() => {
    getAllCategories()
   
  
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center bg-primary justify-center">
     {food?.map((item)=>(
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
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={item.title}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

      

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
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

       

        <div className="flex flex-row justify-center gap-5">
        
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={() => updateuser(item.id)} 
          >
            update in HotDeals
          </button>
        </div>
      </div>
        )
      ))}
    </div>
  );
};

export default UpdateHotCategory;
