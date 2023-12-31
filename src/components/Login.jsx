import React, { useState } from 'react'
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Login = () => {
    const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      // setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <div>  <div className="relative">
    <motion.img
      whileTap={{ scale: 0.6 }}
      src={user ? user.photoURL : Avatar}
      className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
      alt="userprofile"
      onClick={login}
    />
    {isMenu && (
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
      >
        {user && user.email === "admin@gmail.com" && (
          <Link to={"/createItem"}>
            <p
              className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
              onClick={() => setIsMenu(false)}
            >
              New Item <MdAdd />
            </p>
          </Link>
          
        )}
        {user && user.email === "admin@gmail.com" && (
          <Link to={"/createcategory"}>
            <p
              className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
              onClick={() => setIsMenu(false)}
            >
              New Category <MdAdd />
            </p>
          </Link>
          
        )}

        <p
          className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
          onClick={logout}
        >
          Logout <MdLogout />
        </p>
      </motion.div>
    )}
  </div></div>
  )
}

export default Login