import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const LoginPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null); 
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        try {
          const response = await axios.post('http://localhost:22502/register', formData);
          if (response.status === 200) {
              alert("You have successfully created an account");
              location.reload();
          }
      } catch (error) {
          if (error.response.status === 400) {
              alert(error.response.data.message);
          } else {
              console.error('Error submitting user info:', error);
          }
      }
      };

      const handleRemove = async (e) => {
        e.preventDefault();
        removeCookie('cookieName');
        removeCookie('cookieID');
        removeCookie('cookieAdmin');
      }

      const handleLogin = async (e) => {
        e.preventDefault();
    
        const loginFormData = new FormData(e.target);
    
        try {
          const response = await axios.post('http://localhost:22502/login', loginFormData);
          const responseData = response.data;

          if (responseData.login) {
              setCookie('cookieName', responseData.username);
              setCookie('cookieID', responseData.userID);
              setCookie('cookieAdmin', responseData.admin);
              navigate('/');
          }
      } catch (error) {
        if (error.response.status === 401) {
          alert("Incorrect username or password");
      } else {
          console.error('Error submitting user info:', error);
      }
      }
  };

    return (
        <>
        
        {cookies.cookieName ? ( // If user is logged in, display logout button
                        <div className='flex flex-col items-center pt-4 text-3xl'>
                            <button onClick={handleRemove} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Logout</button>
                        </div>
                    ) : (
                      <div className='flex flex-col items-center pt-4'>
                        <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                            Login or Register
                        </h1>
       
                        <div className='flex flex-row'>
                        <div className='w-1/2 m-4'>
                            <form onSubmit={handleLogin} id='logInForm' action='/login' method='post' className='bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan'>
                                <div className='flex justify-center pb-2'>
                                    <h2 className='text-2xl'>Login</h2>
                                </div>
                                
                                <label>Username:</label>
                                <input type="text" name="username" id='username' className="w-full p-2 mb-2 rounded-md text-black" required/>
                                <label>Password:</label>
                                <input type="password" name="password" id='password' className="w-full p-2 mb-2 rounded-md text-black" required/>
                                <div className='flex justify-center'>
                                    <button className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className='w-1/2 m-4'>
                        <form onSubmit={handleRegister} id='registerForm' action='/register' method='post' className='bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan'>
                            <div className='flex justify-center pb-2'>
                                <h2 className='text-2xl'>Register</h2>
                            </div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" id='firstName' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" id='lastName' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Email:</label>
                            <input type="email" name="email" id='email' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Phone Number:</label>
                            <input type="tel" name="phoneNumber" id='phoneNumber' pattern="0\d{10}" title="Please enter a valid phone number starting with 0 and 11 digits long" className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Address Line 1:</label>
                            <input type="text" name="addressLine1" id='addressLine1' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Address Line 2:</label>
                            <input type="text" name="addressLine2" id='addressLine2' className="w-full p-2 mb-2 rounded-md text-black"/>
                            <label>Town/City:</label>
                            <input type="text" name="townCity" id='townCity' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Postcode:</label>
                            <input type="text" name="postcode" id='postcode' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Username:</label>
                            <input type="text" name="username" id='username' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <label>Password:</label>
                            <input type="password" name="password" id='password' className="w-full p-2 mb-2 rounded-md text-black" required/>
                            <div className='flex justify-center'>
                                    <button className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60" type="submit">Submit</button>
                                </div>
                        </form>
                        </div>
                    </div>
                    </div>
                    )}
          
        </>
    );
}