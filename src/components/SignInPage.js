import React, { useContext, useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../firebase';
import { AuthContext } from '../utility/AuthContext';
import validation from '../utility/Validation';
import { Link } from 'react-router-dom';

const SignInPage = () => {


  let email = useRef(null);
  let password = useRef(null);
  let confPassword = useRef(null);
  let fullName = useRef(null);

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

   const {user, setUser} = useContext(AuthContext);



  


  const logIn = (email, password) => {
    if (isSignIn !== true) //SIGN-UP LOGIC
    {
      setErrorMessage(null);
   

         createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
             const userInfo = userCredential.user;
   
             updateProfile(auth.currentUser, {
               displayName:fullName.current.value, photoURL: ""
             }).then(() => {
               console.log("profile updated");
               
             }).catch((error) => {
               console.log(" error during profile update");
             });
   
             console.log(userInfo);
             // setUser(userInfo);


        }
        )   
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const displayError = errorCode + "---"+ errorMessage;

          setErrorMessage(displayError)
        });

    }
    else //SIGN-IN LOGIC
    {
          
      signInWithEmailAndPassword(auth, email, password)
       .then( (userCredential) => {
        const userinfo = userCredential.user;
        console.log(userinfo);
        
        
       })
       .catch( (error) => { 

        const errorCode = error.code;
        const errorMessage = error.message;
        const displayError = errorCode + "---"+ errorMessage;

        setErrorMessage(displayError)
      
            })


    }


  }

  const submitHandler = () => {
      
    if( !isSignIn && password.current.value !== confPassword.current.value)
    {
        setErrorMessage("Password Don't Match");
        return;
    }

     const message = validation(email.current.value, password.current.value);  
     if(message)
     {
      setErrorMessage(message);
      return;
     }

    logIn(email.current.value, password.current.value);
  }

  return (
    <div className=' max-w-[28rem]  mx-auto mt-16 border border-black  '>

      <section className=' flex flex-col border border-black rounded-md p-4' >
        <h1 className='font-bold text-4xl' >{isSignIn ? ("Sign In") : ("Sign Up")}</h1>

        <form className=' flex justify-around flex-col mt-4 gap-4 bg-transparent bg-none'
          onSubmit={(e) => { e.preventDefault(); }}>

          {!isSignIn && <input ref={fullName} type='text' className=' text-lg px-4 py-2 border border-gray-300' placeholder='Full Name' />}

          <input ref={email} className=' text-lg px-4 py-2 border border-gray-300' type='email' placeholder='Email' />
          

          <div className='flex '><input ref={password} className='flex-1 text-lg px-4 py-2  border border-gray-300'  type={showPassword ? "text" : "password"} placeholder='Password' />
          <button onClick={() => setShowPassword(!showPassword)} className=' text-white text-lg px-4 py-2  ml-2 bg-black rounded-md '>{showPassword ? ('Hide Pass') : ('Show Pass')}</button>
          </div>

         {!isSignIn && ( <div className='flex '><input ref={confPassword} className='flex-1 text-lg px-4 py-2  border border-gray-300'  type={showPassword ? "text" : "password"} placeholder='Confirm Password' />
          <button onClick={() => setShowPassword(!showPassword)} className=' text-white text-lg px-4 py-2  ml-2 bg-black rounded-md '>{showPassword ? ('Hide Pass') : ('Show Pass')}</button>
          </div>)}
  
          {errorMessage && (<h1 className='text-red-500 font-semibold'>{errorMessage}</h1>)}

          <button onClick={submitHandler} className=' text-white text-lg px-4 py-2  bg-black rounded-md font-semibold '>{isSignIn ? ("Sign In") : ("Sign Up")}</button>

        </form>

        <h1><Link to={"/forget-password"}><button className='mt-2 hover:text-violet-800'>Forget Password ?</button></Link></h1>

        <h2 className='mt-2 '>{isSignIn && ("Don't Have An Account. ")}<button className=' hover:border-b border-black' onClick={() => { setIsSignIn(!isSignIn) }}>{isSignIn ? ("Sign Up") : ("Sign In?")}</button></h2>



         {user && (<h1>user is valid</h1>)}
         {user && (<h1>{user.displayName}</h1>)}
         
      </section>

    </div>
  )
}

export default SignInPage