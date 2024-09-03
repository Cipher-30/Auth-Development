import React, { useRef, useState } from 'react'
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {
    
    const[message,setMessage] = useState(null)
    const[error, setError] = useState(null);
    const email = useRef(null);

   const resetHandler = () =>
   {
    setError("");
    setMessage("");
      console.log(email);
      sendPasswordResetEmail(auth, email.current.value)
          .then(() => {
             setMessage("Check your Email")
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const displayError = errorCode + "---"+ errorMessage;

            setError(displayError);
          });
       

      
   }

  return (
    <div className='w-full h-screen border border-black'>
        <section className=' mx-auto mt-16 px-4 py-2  max-w-[25rem] border border-black '>
           <form onSubmit={(e)=> {e.preventDefault()}}>
               <h1 className='font-bold text-2xl my-2'>Password Reset</h1>
               <h1 className=' text-lg my-2'>Enter the Register Email</h1>

               <div><input  ref={email} className='w-full  text-lg px-4 py-2 border border-gray-300' type='email' placeholder='Email' /></div>

               {message && (<h1 className='my-2 text-green-500 font-semibold'>{message}</h1>)}
               {error && (<h1 className='my-2 text-red-500 font-semibold'>{error}</h1>) }

               <button onClick={() => { resetHandler() }} className=' w-full my-2 text-white text-lg px-4 py-2  bg-black rounded-md font-semibold '>Reset Password</button>

           </form>
        </section>
    </div>
  )
}

export default ForgetPassword