import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer1";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import NotFound from "../img/NotFound.svg";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { useQuery } from "react-query";
import { getAllCategories, saveCategory,getAllFreshCategories,saveFreshCategory } from "../utils/firebaseFunctions";
import Footer from "./Footer"
import Loader from './Loader';
import BouncingLoader from "./BouncingLoader"
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

import BarsLoader from 'react-loaders-kit/lib/bars/BarsLoader';
import { Link } from "react-router-dom";
const MainContainer = ({loading}) => {
  const [{  user,freshfoodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [filter, setFilter] = useState("abc");
  const [{foodfreshCategory}] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
const [freshfood,setfreshfood] = useState()
const [freshfooditems,setfreshfooditems] = useState()
const [isMenu, setIsMenu] = useState(false);
const [food,setfood] = useState()
const [title,settitle] = useState()
const [id,setid]=useState()

const getAllFreshCategories = async () => {
  setIsLoading(true);
  const items = await getDocs(
    query(collection(firestore, "freshfoodCategory"))
  );

  setfreshfood(items.docs.map((doc) => doc.data()));
  console.log(items)
  setIsLoading(false);
};
const deletefreshcategory = async (id) => {
  await deleteDoc(
    doc(firestore, "freshfoodCategory",id)
  );
  setIsMenu(false)
 
  window.location.reload(true)
  
};
const getAllfreshFoodItems = async () => {
  setIsLoading(true);
  const items = await getDocs(
    query(collection(firestore, "freshfoodItems"), orderBy("id", "desc"))
  );

  setfreshfooditems(items.docs.map((doc) => doc.data()));
  setIsLoading(false);
};

const deletefreshitem = async (id) => {
  await deleteDoc(
    doc(firestore, "freshfoodItems",id)
  );
  setIsMenu(false)
 
  window.location.reload(true)
  
};

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = freshfood?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const title1 = async () => {
    setFilter(title)
    setIsMenu(false)
     
   };
   const login1 = async (title,id) => {
    if (user && user.email === "admin@gmail.com") {
      settitle(title)
      setid(id)
         setIsMenu(!isMenu);
       } else {
      setFilter(title);
    }
  };
  const login = async (title,id) => {
   settitle(title)
   setid(id)
      setIsMenu(!isMenu);
    
  };
  const loaderProps = {
    isLoading,
    size: 35,
    duration: 1,
    colors: ['#5e22f0', '#f6b93b']
}

  useEffect(() => {
    getAllFreshCategories()
    getAllfreshFoodItems()
  
  }, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      
      {isLoading ? <BouncingLoader  /> : 
      <section className="w-full my-6 px-4 md:px-16">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold  capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
            Our fresh & healthy fruits
          </p>

          {/* <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div> */}
        
         
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
       
      
       { currentPosts && currentPosts?.length > 0 ? (
            currentPosts.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.title ? "bg-cartNumBg motion1" : "bg-card motion"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => {login1(category.title,category.id)}}
                // onClick={login}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.title
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <img
                  src={category.imageURL}
                    className={`${
                      filter === category.title
                        ? "text-textColor rounded-full"
                        : "text-white"
                    } group-hover:text-textColor w-8 h-10 rounded-full text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.title
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.title}
                </p>
              </motion.div>
            ))): (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
         
        </div>
      )
       }
            {/* <RowContainer1
            flag={false}
            data={foodCategory}
          /> */}

        </div>
       
        {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col relative right-0"
              >
               
               <Link to={`/updatefreshcategory/${id}`}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Update <MdAdd />
                    </p>
                    </Link>
                 
             
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={()=> deletefreshcategory(id)}
                    >
                      Delete <MdAdd />
                    </p>
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={title1}
                >
                  View Items <MdLogout />
                </p>
              </motion.div>
            )}
           {/* <RowContainer1
           flag={false}
           data={foodCategory}
         /> */}
      
  <Footer className="justify-center items-center" postsPerPage={postsPerPage} totalPosts={freshfood?.length} paginate={paginate} currentPage={currentPage}/>
       <div className="w-full">
         <RowContainer
           flag={false}
           data={freshfooditems?.filter((n) => n.category == filter)}
           
         />
       </div>
          
       </div>
       
      </section>
      }

      

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
