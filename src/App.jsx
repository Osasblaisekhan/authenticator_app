import React, { useState } from 'react';

import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';

import OtpInput from 'react-otp-input';

import { Auth } from './firebase.config';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import toast, { Toaster } from 'react-hot-toast';



import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

import { CgSpinner } from 'react-icons/cg';

const App = () => {

  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);

  const [number, setNumber] = useState('');

  const [showOtp, setShowOtp] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState(null);

  console.log('yoo user', !user);

  const onCaptchVerify = ()=>{
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(Auth, 'recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    onSignup()
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  }
});
    }
  }

  const onSignup = ()=>{
   if(number == ''){
    setErrorMessage('Phone number required')
   }else{
     setLoading(true);
    
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier

    const formatph = '+' + number
    signInWithPhoneNumber(Auth, formatph, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOtp(true)
      toast.success("OTP Send Successfully!")
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...

      alert(error);
      setLoading(false)
    });
     setErrorMessage('')
   }
  }

  // const ToggleState = ()=>{
  //   setShowOtp((prev)=> !prev);
  // }
  return (
    <section className="bg-emerald-500 flex flex-col items-center justify-center h-screen">
      <div>
        
        <Toaster toastOptions={{ duration: 4000 }}/>

        <div id='recaptcha-container'>

        </div>

        {
          user ? 

           <div>
          <h2 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            Login Successs
          </h2>
        </div> :




<div className="flex w-80 flex-col gap-4 p-4 rounded-lg">
        <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
          Welcome to <br /> CODE A PROGRAM WITH BLISE~TECH
        </h1>

        {
          showOtp ?
          <>
        <div className="bg-white text-emerald-500 mx-auto p-4 rounded-full h-fit mb-4">
          <BsFillShieldLockFill size={30} />
        </div>

        <label htmlFor="otp" className="font-bold text-2xl text-white text-center mb-2">
          Enter Your OTP
        </label>

        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp} 
            numInputs={6}
            renderInput={(props) => (
              <input
              disabled={false}
                {...props}
                
                type='number'
                className="h-14 px-8 bg-white border border-gray-300 rounded-md text-center text-white mx-2" 
              />
            )}
          />

        </div>
          <button className='bg-emerald-600 w-full flex gap-2 items-center text-white justify-center py-2.5 text-white rounded'>
            {
              loading &&
            <CgSpinner size={20} className='mt-1.5 animate-spin'/>
            }
            <span>Verify OTP</span>
          </button>
      </> :


      <>
        <div className="bg-white text-emerald-500 mx-auto p-4 rounded-full h-fit mb-4">
          <BsTelephoneFill size={30} />
        </div>

        <label htmlFor="phone" className="font-bold text-2xl text-white text-center mb-2">
          Verify Your Phone Number
        </label>

        <div className='bg-emerald-600 w-full flex gap-2 items-center text-white justify-center py-2.5 text-white rounded'>
          {errorMessage}
        </div>

        <PhoneInput country={'cm'} value={number} onChange={setNumber}/>

          <button onClick={()=> onSignup()} className='bg-emerald-600 w-full flex gap-2 items-center text-white justify-center py-2.5 text-white rounded'>
            {
              loading &&
            <CgSpinner size={20} className='mt-1.5 animate-spin'/>
            }
            <span>Send Code Via SMS</span>
          </button>
      </>
        }

        </div>
        }
      </div>
    </section>
  );
};

export default App;