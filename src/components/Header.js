import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { AuthContext } from '../utility/AuthContext'

const Header = () => {



  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSignOut = () =>
    {
      signOut(auth).then( () =>
      { 
        setUser(null);
       })
      .catch( (error) =>
      {
        console.log(error.message);
        
      })
    }
  



  useEffect( () => {

    const unsubscribe = onAuthStateChanged(auth , (user) => {
       if(user)
       {
          //SIGN-IN OR SIGN-UP (listerner)
            const{uid, email, displayName} = user;
              
            setUser({ uid: uid, email: email, displayName: displayName });
            navigate("/browse")

       }
       else{
        console.log("not able to EL");
        navigate("/")
        
       }

    })


    return () =>{
      unsubscribe();
    }

  },[] )



  return (
   <>
   <header className='flex mx-2 px-2 py-2 border border-black justify-between '>
    {/* LOGO IMAGE  */}
    <nav className=' border-black'>
     <Link to={'/'}><img className='w-[3.2rem]  ' alt='logo' src='https://cryptologos.cc/logos/tether-usdt-logo.png'/></Link>
    </nav>
    
     {/* LI LINKS */}
    <nav className='flex  border-black'>
       <ul className='flex items-center gap-6'>
        <Link to={"/"} ><li  className='border border-black px-4 py-2 cursor-pointer font-semibold rounded-sm hover:bg-white'> Home</li></Link>

       {user && (<Link to={"/browse"} ><li  className='border border-black px-4 py-2 cursor-pointer font-semibold rounded-sm hover:bg-white'> Browse</li></Link>)}

        <Link to={"/signIn"} ><li className='border border-black px-4 py-2 cursor-pointer font-semibold rounded-sm  hover:bg-white' onClick={handleSignOut}>{user ? ("Sign Out"):("Sign In ")}</li></Link>
       </ul>
    </nav>
   
   </header>
   </>
  )
}

export default Header