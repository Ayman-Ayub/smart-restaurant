import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageUploading from 'react-images-uploading';
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import {
  collection,
  doc,
  FieldPath,
  FieldValue,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
 
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem,savefreshItem,getAllfreshFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { stringify } from "postcss";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFreshItem = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  console.log(id)
  const [freshfooditems,setfreshfooditems] = useState()
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  
  const maxNumber = 3;//maximum image upload
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const getAllfreshFoodItems = async () => {
    setIsLoading(true);
    const items = await getDocs(
      query(collection(firestore, "freshfoodItems"), orderBy("id", "desc"))
    );
  
    setfreshfooditems(items.docs.map((doc) => doc.data()));
    setIsLoading(false);
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }

   
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);


  const [title, setTitle] = useState("");
  const [qty, setqty] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [freshcategory, setfreshCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  const [{foodCategory}] = useStateValue();
  const [{foodfreshCategory}] = useStateValue();
  const [freshfood,setfreshfood] = useState()
  const [food,setfood] = useState()
  const getAllCategories = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodCategory"))
    );
  
    setfood(items.docs.map((doc) => doc.data()));
  };
const getAllFreshCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodCategory"))
  );

  setfreshfood(items.docs.map((doc) => doc.data()));
  console.log(items)
};
  const uploadImage = (e) => {
    // for (let i = 0; i < e.target.files.length; i++) {
    //   const newImage = e.target.files[i];
    //   newImage["id"] = Math.random();
    //   setImages((prevState) => [...prevState, newImage]);
    // }
    const promises = [];
    setIsLoading(true);
  
    images.map((image) => {
    const storageRef = ref(storage, `Images/${Date.now()}-${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    promises.push(uploadTask);
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
      async () => {
       
          getDownloadURL(uploadTask.snapshot.ref)
          .then((urls) => {
            setUrls((prevState) => [...prevState, urls]);
           
          });
          Promise.all(promises)
          .then(() => { 
           setImages([]);
            setFields(true);
            setIsLoading(false);
            setMsg("Image uploaded successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
              setFields(false);
            }, 4000);})
          .catch((err) => console.log(err));
            
      }
     
    );
  })
  };

  const deleteImage = () => {
    setIsLoading(true);
    // urls.map((url,i) =>(
   
    
    deleteObject(ref(storage, urls)).then(() => {
      setUrls("");
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
    // ))
  };

 

  const updatefreshDetails =async (uid) => {
    console.log(uid)
    setIsLoading(true);
   let data ={}
      if (!title || !qty  || !price || !freshcategory) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
         data = {
         
          title: title,
          imageURL: urls,
          category: freshcategory,
          // calories: calories,
          qty: qty,
          price: price,
        };
      
        const updatedocument = doc(firestore, "freshfoodItems", uid);
        await updateDoc(updatedocument, data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
        navigate("/*")
      }
  
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setImages([])
    setUrls([]);
    setCalories("");
    setPrice("");
    setqty("");
    setCategory("Select Category for hot deal");
    setfreshCategory("Select Category for fresh food");
  };

  
  useEffect(() => {
    getAllCategories()
    getAllFreshCategories()
    getAllfreshFoodItems()
  }, []);
  return (
    <div className="w-full min-h-screen bg-primary flex items-center justify-center">
      {freshfooditems?.map((item)=>(
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

       
       
        <div className="w-full">
          <select
            onChange={(e) => setfreshCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category for fresh food
            </option>
            {freshfood &&
            freshfood.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.title}
                >
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        {/* <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg"></div> */}
       
            <>
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      
                    </div>
                    <input type="file" multiple onChange={handleChange}  className="" />
                   
                  </label>
        
        <div className="flex flex-row w-full justify-center">
      <button className="  border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
       onClick={uploadImage}>Upload Images</button>
     
                    </div>
      <br />
      
      </>
         
      
          
        
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
            {!urls ? (
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
                      multiple
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
            ):(
                <>
                  <div className="relative h-full">
                  <div className=" flex flex-row">
                  {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "180px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))}
      </div>
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
            )
            }
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={qty}
              onChange={(e) => setqty(e.target.value)}
              placeholder={item.qty}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={item.price}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center gap-5">
         

          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={()=>updatefreshDetails(item.id)}
          >
            Save in Fresh Items
          </button>
        </div>
      </div>
        )
      ))}
    </div>
  );
};

export default UpdateFreshItem;
