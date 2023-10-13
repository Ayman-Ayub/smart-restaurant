import React, { useEffect, useState } from 'react'
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
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import RowContainer from './RowContainer';
import MenuItems from './MenuItems';
import Button from "@material-ui/core/Button";
import BouncingLoader from './BouncingLoader';
import CartContainer from './CartContainer';
import { useStateValue } from "../context/StateProvider";
const Menu = () => {
  const [{  user,freshfoodItems, cartShow }, dispatch] = useStateValue();
    const [search, setsearch] = useState("");
    const [fooditems,setfooditems] = useState()
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(7);
    const [food,setfood] = useState()
    const [counter, setCounter] = useState(currentPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = food?.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const getAllFoodItems = async () => {
      setIsLoading(true)
        const items = await getDocs(
          query(collection(firestore, "foodItems"), orderBy("category", "desc"))
        );
      
        setfooditems(items.docs.map((doc) => doc.data()));
        setIsLoading(false)
      };
    const getAllCategories = async () => {
        const items = await getDocs(
          query(collection(firestore, "foodCategory"))
        );
      
        setfood(items.docs.map((doc) => doc.data()));
        
      };

      const forwardButton = () => {
        paginate((prevActiveStep) => prevActiveStep + 1);
        setCounter(counter + 1)
      };
      
     
      
      const previousButton = () => {
        paginate((prevActiveStep) => prevActiveStep - 1);
        setCounter(counter - 1)
      };
      const page =Math.ceil(food?.length/postsPerPage);
      useEffect(() => {
        getAllCategories()
        getAllFoodItems()
      
      },  [cartShow]);
  return (
    <div className=' h-full bg-primary '>
    {isLoading ? <BouncingLoader /> :
    <div className=' h-full bg-primary px-12'>

<div class=" w-full md:w-full sm:w-full bg-primary  align-middle justify-center flex flex-row  items-center py-4  drop-shadow-xl">
<Button disabled={counter===1}>
<IoIosArrowBack className="text-orange-500 font-semibold w-10 h-10" onClick={previousButton}  /></Button>


{currentPosts && currentPosts?.length > 0 ? (
            currentPosts.map((category) => (
             <button
              onClick={() => setFilter(category.title)}
              type="submit"
              class=" font-dm items-center py-2 px-5 ml-4 sm:ml-2 text-base text-orange-500 font-semibold bg-orange-100 rounded-[4px] "
            >
              {category.title}
            </button>
            ))
): (
    <div>

    </div>
)}
<Button disabled={counter===page}>
<IoIosArrowForward className=" text-orange-500 font-semibold w-10 h-10"   onClick={forwardButton }  /></Button>
</div>
<div className="w-full">
          <MenuItems
            flag={false}
            data={fooditems?.filter((n) => n.category == filter)}
          />
        </div>

<div className='flex flex-col'>
        {/* {fooditems && fooditems?.length > 0 ? (
            fooditems.map((category) => ( */}
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Menu
        </p>
            
            {/* ))
): (
    <div>

    </div>
)} */}
<MenuItems
            flag={false}
            data={fooditems}
          />
</div>
           
    </div>
    }
    {cartShow && <CartContainer />}
    </div>
  )
}

export default Menu