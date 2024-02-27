import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
    const [cookies] = useCookies(['cookieAdmin']);
    const isAdmin = cookies.cookieAdmin;
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/loginPage');
    };
    return (
        <>
        {isAdmin === true ? (
            <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Admin Page
                </h1>
            </div>
            ) : (
                <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 mb-4"> 
                    You Need to be Using an Admin Account
                </h1>
                   <button onClick={handleRedirect} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Click here to Login</button>
              </div>
            )
            }
        </>
    );
}