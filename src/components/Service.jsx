import React, { useEffect, useState } from 'react'
import img1 from '../img/table1.png'
import img2 from '../img/dinner2.png'
import img3 from '../img/delivery2.png'
import img4 from '../img/arrowback.png'
import img5 from '../img/arrowforward.png'
import c7 from '../img/c7.png'
import c8 from '../img/c8.png'
import mobile from '../img/mobile1.png'
import googlestore from '../img/googlestore.png'
import * as md from "react-icons/md";
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
import ServicesItems from './ServicesItems'
const Service = () => {
  const [food,setfood] = useState()
  const fooditems =[
    {
      title:"Our Hot Deals",
      price: 20,
      imageURL:c7
    },
    {
      title:"Our Fresh & Healthy Deals",
      price: 20,
      imageURL:c8
    },
  ]
  const getAllCategories = async () => {
    const items = await getDocs(
      query(collection(firestore, "foodCategory"))
    );
  
    setfood(items.docs.map((doc) => doc.data()));
    
  };
  useEffect(() => {
    getAllCategories()
   
  
  }, []);
  return (
    <div className=' h-full bg-primary'>
    <div className='flex xl:flex-row md:flex-col pt-10 ml-12 sm:flex-col'>
    <div className='flex flec-row'>
        <div className='bar xl:w-8 lg:w-4 xl:h-20 lg:h-14 bg-orange-600 md:w-4'></div>
        <h1 className='ml-6 text-4xl font-sans font-bold'>Our Services</h1>
        </div>
        <p className='xl:ml-24 lg:ml-18 md:ml-14  text-lg font-sans mr-40 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum distinctio nobis exercitationem mollitia quidem possimus, aspernatur optio ratione amet odio in totam eli.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum voluptatem ipsam voluptatibus aliquid corrupti quia ad repellat nihil officia iure, architecto distinctio ullam fugiat aperiam dolorem. Fugit eius nesciunt tempora!</p>
    </div>



    <div className='flex xl:flex-row lg:flex-col md:flex-col sm:flex-col m-11 mt-24 bg-slate-200 delivery'>
    <div className='flex flex-col xl:w-3/5'>
      <div className='flex flex-row delivery'>
        <div className='w-[40%] m-10 h-[300px] px-20 py-10 bg-orange-100 deliveryimg items-center justify-center '>
        {/* <md.MdDining className='text-orange-500 text-4xl'/> */}
          <img className='w-56  xl:pt-5 lg:pt-5 md:pt-10' src={img1} alt="" />
        </div>
         <div className='w-[60%] flex flex-row  align-middle items-center delivery'>
        
        <img src={img4} className="w-44 h-16 -ml-24"/>
       <div className='delivery'>
          <h1 className='text-orange-500 pl-8 text-3xl font-sans font-medium '>Advance Table Booking</h1>
       <p className='text-headingColor pl-8 text-lg font-sans'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
       </div>
        </div>
      </div>
      <div className='flex flex-row delivery'>
       <div className='w-[60%] flex flex-row -mr-24 delivery  align-middle items-center'>
     
       <div className='mr-10 delivery'>
          <h1 className='text-orange-500 xl:pl-40 lg:pl-64 md:pl-24  text-3xl font-sans font-medium '>Food For Free</h1>
                    <h1 className='text-orange-500 xl:pl-72 lg:pl-96 md:pl-56 text-3xl font-sans font-medium '>24/7</h1>
       <p className='text-headingColor pl-10 text-lg font-sans'>Lorem, ipsum dolor sit amet consect adipisicing elit. </p>
       </div>
        <img src={img5} className="w-44 h-16 z-10 "/>
        </div>
        <div className='w-[40%] deliveryimg xl:m-10 lg:m-20 md:ml-20 h-[300px] px-20  py-10 bg-orange-100 items-center justify-center '>
         <img className='w-56 items-center justify-center xl:pt-5 lg:pt-5 md:pt-10' src={img2} alt="" />
        </div>
      </div>
</div>
      <div className='flex flex-col xl:w-2/5 bg-orange-100 m-10 px-28 items-center py-20'>
       
        <div className='xl:w-[80%] deliveryimg '>
          <img src={img3} alt="" />
        </div>
        <div className=' mt-20 flex flex-row  align-middle items-center'>
     
       <div>
          <h1 className='text-orange-500 pl-8 text-3xl font-sans font-medium '>Free Home Delivery at Your Home Steps</h1>
                    <div className='bg-orange-500 w-44 h-2 xl:ml-44 lg:ml-80 md:ml-64 mt-5 text-3xl font-sans font-medium '>
                    
                    </div>
       <p className='text-headingColor pl-8 text-lg font-sans'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet. </p>
       </div>
        
        </div>
      </div>
    </div>

    <div className='w-full mt-10  '>
     <div className='flex flex-col items-center justify-center pt-10' >
      <h1 className='text-4xl   font-semibold  text-headingColor '>Explore Our Food</h1>
      <p className='w-[60%]  pt-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quasi suscipit cum cupiditate, perspiciatis ex illum, quaerat dolorum sint esse consequuntur</p>
     </div>
     <div className='flex flex-col items-center justify-center pt-10'>
<ServicesItems  flag={false}
            data={fooditems}/>
     </div>
    </div>

    <div className='w-full mt-10 delivery flex flex-row gap-16 bg-orange-100'>
<div className='w-2/3 justify-center delivery  flex flex-col  pl-20 '>
<div className='xl:w-2/3 md:w-full delivery flex mt-10 pl-12 justify-center '>
        <div className='w-4 h-30 bg-orange-600 bar'></div>
        <h1 className='ml-6 xl:text-6xl lg:text-3xl md:text-xl font-sans font-bold'>Download App for Exciting Deals</h1>
      
    </div>
    <p className='w-2/3  ml-24 mt-6 xl:text-lg lg:text-lg md:text-base font-sans  '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi rerum perspiciatis odio facilis quia </p>
  <div className='w-2/3 mt-8 ml-24 delivery items-center justify-center'>
    <img src={googlestore} alt="" />
    </div>
</div>
<div className='delivery'>
  <img src={mobile} alt="" className='xl:-ml-40 lg:-ml-40 md:-ml-20 xl:w-[650px] lg:w-[650px] md:w-[850px] md:h-[700px]' />
</div>
    </div>
    </div>
  )
}

export default Service