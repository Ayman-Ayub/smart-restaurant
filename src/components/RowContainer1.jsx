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
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import { Link } from "react-router-dom";

const RowContainer = ( {flag, data, scrollValue,deleteitem }) => {
  const rowContainer = useRef();
  const [title,settitle] = useState()
  const [id,setid]=useState()
  const [items, setItems] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [{ cartItems,user }, dispatch] = useStateValue();
  const deletefreshitem = async (id) => {
    await deleteDoc(
      doc(firestore, "freshfoodItems",id)
    );
   console.log("deleted")
   window.location.reload(true)
   setIsMenu(false)
    
  };
  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  const login1 = async (title,id) => {
    if (user && user.email === "admin@gmail.com") {
      settitle(title)
      setid(id)
         setIsMenu(!isMenu);
       } else {
     
    }
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
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
          
            key={item?.id}
            className="w-275 motion h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center motion justify-between"  >
           
              <motion.div
                className="w-40 h-40 cartmain  -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
             
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full motion2 bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-16 "
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
              
              {user && user.email === "admin@gmail.com" && (
              <motion.div
             
             whileTap={{ scale: 0.75 }}
             className=" h-8 rounded-full motion2 flex items-center justify-center cursor-pointer hover:shadow-md -mt-16 -ml-8"
              onClick={() => {login1(item?.title,item?.id)}}
           >
             <HiDotsVertical style={{cursor:'pointer',}} />
           </motion.div>)}
             
            </div>

            <div className="w-full flex flex-col motion items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center motion gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
      {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl mt-72 rounded-lg flex flex-col absolute  z-10"
              >
                    <Link to={`/updatefreshitem/${id}`}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Update <MdAdd />
                    </p>
                    </Link>
             
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={()=> deletefreshitem(id)}
                    >
                      Delete <MdDelete />
                    </p>
               
              </motion.div>)}
    </div>
  );
};

export default RowContainer;
