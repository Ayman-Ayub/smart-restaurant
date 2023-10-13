import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Rating from '@material-ui/lab/Rating';
import Carousel from 'better-react-carousel';
import CartContainer from './CartContainer';
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
import NotFound from "../img/NotFound.svg";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { firestore } from "../firebase.config";
import { actionType } from "../context/reducer";
import { MdShoppingBasket } from "react-icons/md";
import { saveReview} from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { Image } from 'react-bootstrap';


import MenuItems from './MenuItems';
import { TextField } from '@material-ui/core';
import { Star } from '@material-ui/icons';
const Detail = () => {
  const [ratingValue, setRatingValue] = React.useState(0);
  const [review,setReview] = useState();
  const [name,setName] = useState();
  const [itemvalue,setItemvalue] = useState();
  const [email,setEmail] = useState();
  const [fooditems,setfooditems] = useState();
  const [foodreview,setfoodreview] = useState();
  const [items, setItems] = useState([]);
  const [categories, setCategory] = useState([]);
  const { id,category } = useParams();
  const [isMenu, setIsMenu] = useState(true);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [{  freshfoodItems, cartShow },] = useStateValue();
  const getAllReviewItems = async () => {
    const items = await getDocs(
      collection(firestore, "Review")
    );
  
    setfoodreview(items.docs.map((doc) => doc.data()));
    console.log(foodreview)
  };

  const saveDetails = (title,id) => {
    setItemvalue(title);
    console.log(itemvalue,review,name,ratingValue,email)
    setIsLoading(true);
    try {
      if (!review ||  !name ||  !ratingValue ||  !email) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const reviewdata = {
          id: `${Date.now()}`,
         review: review,
         name: name,
         rating: ratingValue,
         email: email,
         itemValue: itemvalue,
         
        };
        saveReview(reviewdata);
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
    setName("");
    setEmail("");
    setReview("");
    setRatingValue("");
   
  };

  const viewdescription = async () => {
   
   setIsReview(false)
   setIsMenu(!isMenu);
   console.log("open")
 
    
  };

  const viewreview = async () => {
    setIsMenu(false)
 setIsReview(!isReview)
  
     
   };
   const [imageitem, setimageitem]=useState([])
  const img=[];
  img.push(imageitem)
  console.log(img)
  const [{ cartItems,user }, dispatch] = useStateValue();
  const getAllFoodItems = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodItems"), where("id", "==", id))
    );
  
    setfooditems(items.docs.map((doc) => doc.data()));
    console.log(fooditems,imageitem)

    {fooditems?.map((item)=>{
      setimageitem(item?.imageURL[0])
      
    })}
  };
  const item =  
    query(collection(firestore, "foodItems"),  where("id", "!=", id ));
  const getAllFoodItem = async () => {
    const item = await getDocs(
      query(collection(firestore, "foodItems"), where("category", "==", category ))
    );
  
    setCategory(item.docs.map((doc) => doc.data()));
    console.log(categories)
  };
  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

 
  useEffect(() => {
  
    getAllFoodItems()
    getAllFoodItem()
    getAllReviewItems()
  }, []);
  useEffect(() => {
    addtocart();
  }, [items,cartShow]);

  const [currentImage, setCurrentImage] = useState("")
  return (
    <div
   
    className={`w-full flex flex-col px-16  bg-primary   py-12 scroll-smooth  overflow-x-scroll scrollbar-none
        `}
  >
    {fooditems && fooditems.length > 0 ? (
      fooditems.map((item) => (
      
        <div
        // onClick={() => detail(item?.id)}
          key={item?.id}
          className=" motion   bg-primary rounded-lg py-2 px-4  my-12 backdrop-blur-lg   flex flex-row items-left justify-left "
        >
       
        <div className='flex flex-col gap-4 w-[620px]  '>
        {currentImage ? (
          <div className="motion border-orange-500 items-center justify-center p-5 mt-5 border-2 ">
           
             <InnerImageZoom   alt=""
                className=" w-[620px] h-[590px] object-fill" src={currentImage} />
            </div>
            ):(
              <div className="motion border-orange-500 items-center justify-center p-5 mt-5 border-2 ">
           
             <InnerImageZoom   alt=""
                className=" w-[620px] h-[590px] object-fill" src={item?.imageURL[0]} />
            </div>
            )
            }
            {/* <Carousel interval={3000} indicators>
      {item?.imageURL.map((image) => (
        <Carousel.Item key={image}>
          <Image src={image} alt="image" />
        </Carousel.Item>
      ))}
    </Carousel> */}

            <Carousel cols={2} rows={1} gap={6} loop > 
            {item?.imageURL.map((image) => (
                            <Carousel.Item key={image} className=" px-5">
                                <img onClick={() => setCurrentImage(image)}  src={image} className="w-100" />
                            </Carousel.Item>
                        ))}
            </Carousel>
        
           </div>
        
          
           
         
            
          <div  className="w-full flex flex-col motion mt-10 ml-16   ">
            <p className="text-textColor font-semibold text-xl md:text-xl">
              {item?.title}
            </p>
           
            {/* <hr className="border-1 mt-2 border-gray-200 w-full h-0"/> */}
            <div className="flex items-center mt-4 ">
              <p className="text-lg text-headingColor font-semibold"> Price
                <span className="text-lg text-red-500"> $</span>{item?.price}
              </p>
            </div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" rounded-full mt-8 w-48 motion2 bg-red-600 px-4 py-3 flex gap-3 items-center justify-center cursor-pointer hover:shadow-md  "
              onClick={() => setItems([...cartItems, item])}
            >
            <p className="text-lg  text-white font-normal">Add to cart</p>
              <MdShoppingBasket className="text-white" />
            </motion.div>

            <hr className="border-1 mt-2 border-gray-200 w-full h-0"/>
            <p className="mt-1 text-base text-headingColor font-semibold">
            Category: 
            <span className="text-sm text-orange-500"> {item?.category}</span>
            </p>
          </div>
         
        </div>
      ))
    ) : (
      <div className="w-full flex flex-col items-center justify-center">
        {/* <img src={NotFound} className="h-340" />
        <p className="text-xl text-headingColor font-semibold my-2">
          Items Not Available
        </p> */}
      </div>
    )}
    <div className='w-full flex flex-col mb-16'>
    
    <div className=' flex flex-row'>
        {/* {fooditems && fooditems?.length > 0 ? (
            fooditems.map((category) => ( */}
            <button onClick={viewdescription} className="text-2xl font-semibold capitalize text-headingColor   pr-10">
          Description
        </button>
        
        <button onClick={viewreview} className="text-2xl font-semibold capitalize text-headingColor   before:rounded-lg after:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Review
        </button>
       
        </div>

        {isMenu && (
                       
      fooditems?.map((item) => (
      <div
        // onClick={() => detail(item?.id)}
          key={item?.id}
          className=" motion   bg-primary rounded-lg py-2 px-4 mt-4 backdrop-blur-lg   flex flex-row items-left justify-left "
        >
        <p className="text-textColor font-semibold text-xl md:text-xl">
              {item?.title}
            </p>
            </div>
     ))
              
        )}

        {isReview && (
        foodreview?.map((item)=>(
          
  <div  className="w-full h-full mt-10 px-10 flex flex-col">
<div className='flex flex-row'>
  <p className="text-headingColor font-semibold text-xl md:text-xl">
            {item.name} :
            </p>
            <div className='flex flex-col px-10 '>
            <p className="text-orange-500 font-semibold text-xl md:text-xl">
            {item.rating} Stars
            </p>
          
            <p className="text-textColor font-semibold text-lg md:text-lg">
            {item.review} 
            </p>
</div>
            </div>
  </div>
))
        )}

        {isReview && (



          fooditems?.map((item) => (   
                      
                       <div
                        
                           className="w-full h-full mt-10 p-10 border-orange-500 border-2 "
                         >
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
                        <p className="text-textColor font-semibold text-xl md:text-xl">
             Review our item <span className='text-orange-500'> {item?.title}</span>
            </p>
            <p className="text-textColor font-semibold text-lg md:text-lg my-2">
            Your email address will not be published. Required fields are marked *
            </p>
            <div className='flex flex-row my-5 gap-3'>
            <p className="text-textColor font-semibold text-xl md:text-xl">
             Your rating *
            </p>
            <Rating
          name="Rating Label"
          value={ratingValue.toString()}
          onChange={(event) => {
            setRatingValue(event.target.value);
          }}
        />
            </div>

            <div className='flex flex-col my-5 gap-3'>
            <p className="text-textColor font-semibold text-xl md:text-xl">
             Your review *
            </p>
            <textarea className='h-40'  value={review} onChange={e => setReview(e.target.value)}/>
            </div>

            <div className='flex flex-row gap-9  '>
            <div className='flex flex-col my-5 w-[50%] '>
            <p className="text-textColor font-semibold text-xl md:text-xl">
             Your name *
            </p>
            <textarea className='h-14'  value={name}  onChange={e => setName(e.target.value)}/>
            </div>

            <div className='flex flex-col my-5 w-[50%] '>
            <p className="text-textColor font-semibold text-xl md:text-xl">
             Your email *
            </p>
            <textarea className='h-14'  value={email}  onChange={e => setEmail(e.target.value)}/>
            </div>
            </div>

            <div className='my-5'>
              <button className='px-12 py-4 bg-orange-600 text-white'
              onClick={() => {saveDetails(item?.title,item?.id)}}>Submit</button>
            </div>
                             </div>
          ))
                               
                         )}
        </div>
    <div className='flex flex-col'>
        {/* {fooditems && fooditems?.length > 0 ? (
            fooditems.map((category) => ( */}
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Related Items
        </p>
        
            
            {/* ))
): (
    <div>

    </div>
)} */}
{/* {categories && categories.length > 0 ? (
  
<MenuItems
            flag={false}
            data={categories}
          />
          ):(
             <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
          )
          } */}


          <div
    
      className={`w-full flex items-center gap-3 justify-center  my-12 scroll-smooth overflow-x-scroll scrollbar-none`}
    >
      {categories && categories.length > 0 ? (
        categories.map((item) => (
         (item?.id !== id) ?(
          <div
          // onClick={() => detail(item?.id)}
            key={item?.id}
            className="w-375 h-[475px] min-w-[475px] motion md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg  hover:border-orange-500 hover:border-2 flex flex-col items-center justify-evenly relative"
          >
          
            <div className="w-full mt-8 motion flex items-center justify-between">
           
              <motion.div
                className="w-80 h-44 motion -mt-12 drop-shadow-xl"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-80 h-full object-contain"
                />
              </motion.div>
              {/* <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8 mr-[-30px]"
                onClick={()=> deleteitem(item?.id)}
              >
                <MdDelete className="text-white" />
              </motion.div> */}
              </div>
             
           
             
           
              <Link  to={`/detail/${item?.category}/${item?.id}`}>
            <div  className="w-full flex flex-col motion items-center justify-center -mt-8">
              <p className="text-textColor font-semibold text-xl md:text-xl">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <hr className="border-1 mt-2 border-gray-200 w-full h-0"/>
              <div className="flex items-center mt-9 gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-lg text-red-500">$</span> {item?.price}
                </p>
              </div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className=" rounded-full mt-4 motion2 bg-red-600 px-4 py-3 flex gap-3 items-center justify-center cursor-pointer hover:shadow-md  "
                onClick={() => setItems([...cartItems, item])}
              >
              <p className="text-lg  text-white font-normal">Add to cart</p>
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            </Link>
          </div>
          ):(  <div >
       
        </div>)
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
      
    </div>
</div>
{cartShow && <CartContainer />}
  </div>
  )
}

export default Detail