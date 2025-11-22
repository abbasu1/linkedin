import React, { useContext, useState } from 'react'
import logo from "../assets/logo.svg";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
function Signup() {
  let [show, setShow] = React.useState(false);
  let navigate=useNavigate();
let { serverUrl } = useContext(authDataContext);
  let [firstName, setFirstname] =useState("");
  let [lastName, setLastname] =useState("");
  let [userName, setUsername] =useState("");
  let [email, setEmail] =useState("");
  let [password, setPassword] =useState("");  
  // In your Signup.jsx component

const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          firstName,
          lastName,
          userName,
          email,
          password
        },
        { withCredentials: true }
      );
      
      // If successful (status 201), you can navigate or show a success message
      console.log("Sign-up successful!", result.data);
      // navigate("/dashboard"); 
      
    } catch (err) {
      // 1. Log the full error object for internal debugging
      console.log("error in signup", err); 
      
      // 2. CHECK if the error has a response object (meaning the server sent a non-2xx status)
      if (err.response) {
        // 3. Log the server's specific error message
        console.error("Server Error Message:", err.response.data.message);
        
        // 4. (Optional) Display the error to the user in the UI instead of just logging it
        // alert(err.response.data.message);
        
      } else {
        // Handle network errors (e.g., server offline)
        console.error("Network or unknown error:", err.message);
      }
    }
}
  return (
    <div className='w-full h-screen bg-[white] flex flex-col items-center justify-start g-[10px]'>
      <div className='p-[25px] lg:p-[30px] w-full'>
        <img src={logo} alt="logo-linkedin" />
        </div>
        <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl flex flex-col  justify-center gap-[10px] p-5 md:p-[30px] rounded-md ]' onSubmit={handleSignUp}>
          <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'>Sign Up</h1>
          <input type="text" placeholder='firstname' required className='w-full h-[50px] border-2 border-gray-600 text-gray-600 text-[18px] px-[20px] py-[10px] rounded-md outline-blue-500'value={firstName} onChange={(e)=>setFirstname(e.target.value)}/>
          <input type="text" placeholder='lastname' required className='w-full h-[50px] border-2 border-gray-600 text-gray-600 text-[18px] px-[20px] py-[10px] rounded-md outline-blue-500' value={lastName} onChange={(e)=>setLastname(e.target.value)}/>
          <input type="text" placeholder='username' required className='w-full h-[50px] border-2 border-gray-600 text-gray-600 text-[18px] px-[20px] py-[10px] rounded-md outline-blue-500'  value={userName} onChange={(e)=>setUsername(e.target.value)}/>
          <input type="email" placeholder='email' required className='w-full h-[50px] border-2 border-gray-600 text-gray-600 text-[18px] px-[20px] py-[10px] rounded-md outline-blue-500'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <div className="w-full h-[50px] border-2 border-gray-600 rounded-md focus-within:border-transparent relative">
  <input
    type={show ? "text" : "password"}
    placeholder="password"
    required
    className="w-full h-full px-[20px] py-[10px] text-[18px] text-gray-600 
               outline-blue-500 border-none focus:outline-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)}
  />
  <span className='absolute right-[20px] top-[10px] text-[#0facf5] font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{show?"hide":"show"}</span>
</div>

          <button type='submit' className='w-full h-[50px] rounded-full bg-[#0ff5f5] mt-[30px] text-white'>Sign Up</button>
          <p className='text-center'>Already have an account ? <span className='text-[#0facf5] cursor-pointer' onClick={()=>navigate("/login")}>login</span></p>
        </form>
    </div>
  )
}

export default Signup
