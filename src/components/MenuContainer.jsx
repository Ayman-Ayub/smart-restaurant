import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";

import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import RowContainer1 from "./RowContainer1";
import NotFound from "../img/NotFound.svg";
import Footer from "./Footer"
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
import { Link } from "react-router-dom";
const MenuContainer = (datacategory) => {
  const [filter, setFilter] = useState("Chicken");
  const [{foodCategory}] = useStateValue();
  const [{foodItems}] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  const [isMenu, setIsMenu] = useState(false);
  const [food,setfood] = useState()
  const [title,settitle] = useState()
  const [id,setid]=useState()
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
const [fooditems,setfooditems] = useState()
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = food?.slice(indexOfFirstPost, indexOfLastPost);
  const getAllFoodItems = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
  
    setfooditems(items.docs.map((doc) => doc.data()));
  };
  const deletecategory = async (id) => {
    await deleteDoc(
      doc(firestore, "foodCategory",id)
    );
    setIsMenu(false)
   
    window.location.reload(true)
    
  };
  const getAllCategories = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodCategory"))
    );
  
    setfood(items.docs.map((doc) => doc.data()));
  };

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
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllCategories()
    getAllFoodItems()
  
  }, []);
  return (
    <section className="w-full my-6 px-4 md:px-16" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold  capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
         
         
          {currentPosts && currentPosts?.length > 0 ? (
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
      )}
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
               <Link to={`/updatehotcategory/${id}`}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Update <MdAdd />
                    </p>
                    </Link>
             
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={()=> deletecategory(id)}
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
   <Footer postsPerPage={postsPerPage} currentPage={currentPage} totalPosts={food?.length} paginate={paginate}/>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={fooditems?.filter((n) => n.category == filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
