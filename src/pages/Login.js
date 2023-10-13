import React, {useEffect, useState} from 'react'
import "../styles/Login.css"
import "../styles/headline.css"
import "../styles/inputField.css"
import { app } from "../firebase.config";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { NavLink , useNavigate} from "react-router-dom";
import img from '../img/logo.png'
import bcrypt from 'bcryptjs'
import { FaEnvelope } from "react-icons/fa";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff } from "react-icons/io";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../context/auth";
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import InputField from '../components/InputField';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [getuser,setgetuser]=useState();
    const [getemailuser,setgetemailuser]=useState([]);
    const { login } = useAuth();
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    const [err, setErr] = useState(false);
    const getAllUser = async () => {
      const user = await getDocs(
        query(collection(firestore, "User"), orderBy("id", "desc"))
      );
    
      setgetuser(user.docs.map((doc) => doc.data()));
      // console.log(getuser)
    };

    const getUser = async () => {
     {getuser.map((val)=>{
      if(val.email===email){
        setgetemailuser(getuser)
      }
     })
    //  console.log(getemailuser)
    }
    };
    const login1 = async () => {
      if (!user) {
       
        const {
          user: { refreshToken, providerData },
        } = await signInWithPopup(firebaseAuth, provider);
        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });
        login("user");
        localStorage.setItem("user", JSON.stringify(providerData[0]));
        navigate("/*", { replace: true });
        // <Navigate to="/*" replace />
      } else {
        // <Navigate to="/*" replace />
        // navigate("/*", { replace: true });
      }
    };
    const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    const getemail= [];
    const signIn = (e) => {
      var data = getuser?.filter(val => val.email === email)
      // console.log(data); 
      getemail.push(data[0])
      // console.log(getemail); 
      {getuser.map((val,ind) => {
        if (
          email === val.email &&
          hashedPassword === val.password
         
        ) 
        {
          // console.log("true")
          dispatch({
            type: actionType.SET_USER,
            user: getemail[0],
          });
          login("user");
           localStorage.setItem("user",JSON.stringify( getemail[0]));
          // console.log(getemail[0]);
          navigate("/*", { replace: true });
          // setErr(false);
          // console.log("login")
        } else {
          setErr(true);
        
          // window.location.reload(true);
          // navigate("/signup", { replace: true });
        }
      })}
      };

       
      useEffect(() => {
        getAllUser()
        
      
      }, []);

   
  return (
    <div className='login'>
     <div className="container">
        <NavLink to="/">
        <img src={img} alt="" className='login-logo' />
        </NavLink>
     </div>
     <div>
     <div className="headline" >
      <div className="center-container">
        Welcome Back
       
      </div>
      
    </div>
    </div>
        <div className="login_container">
        {err ? <p className="paraline">Invalid Credentials!</p> : ""}
            <h1>Sign-In</h1>
            <Link to="/scannerr">
            <button type='submit' className='login_registerButton w-56 xl:ml-36 lg:ml-32 '>Scan to Order</button>
</Link>
            <button type='submit'  onClick={login1} className='login_signinButton'>Sign In with Google</button>
               <div>
                <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            changeHandler={e => setEmail(e.target.value)}
          />
                
                
                <InputField
            icon={GoEllipsis}
            icon2={IoIosEyeOff}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            changeHandler={e => setPassword(e.target.value)}
            // fieldStyle={{ width: "70%" }}
          />
                {/* <span className="forgot-password">Forget Pasword?</span> */}
                </div>
                <button type='submit'  onClick={signIn} className='login_signinButton w-56 xl:ml-36 lg:ml-32'>Sign In</button>
           
            <p className="paraLine">Don't have an account yet, click to create your account</p>
            <Link to="/signup">
            <button type='submit' className='login_registerButton w-56 xl:ml-36 lg:ml-32 '>Create Your Account</button>
</Link>
        </div>
    </div>
  )
}

export default Login
