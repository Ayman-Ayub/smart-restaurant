import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import {  MdAdd } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
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
  import { Link, Navigate } from "react-router-dom";
  import { firestore } from "../firebase.config";
import { useNavigate} from "react-router-dom";
import Detail from "./Detail";
const MenuItems = ({ flag, data, scrollValue }) => {
  const navigate = useNavigate();
    const rowContainer = useRef();
  const [title,settitle] = useState()
  const [idd,setid]=useState()
  const [items, setItems] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [{ cartItems,user }, dispatch] = useStateValue();
  const deleteitem = async (id) => {
    await deleteDoc(
      doc(firestore, "foodItems",id)
    );
    console.log(id)
   console.log("deleted")
  window.location.reload(true)
    
  };
  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  const detail = async (id) => {
    
    
      setid(id)
        console.log(idd)
        
       
  };
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3   my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
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
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {/* <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p> */}
        </div>
      )}
      
    </div>
  )
}

export default MenuItems