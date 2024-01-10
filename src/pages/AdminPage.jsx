import React from 'react';

export const AdminPage = () => {
    return (
        <>
            <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Admin Page
                </h1>


            <div className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan mt-4 w-1/2">
                <form id="carDetailsForm">
                    <label>Username:</label>
                    <input type="text" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Password:</label>
                    <input type="password" className="w-full p-2 mb-2 rounded-md text-black" />
                    <button type="button" onclick="">Submit</button>
                </form>
            </div>
            </div>
        </>
    );
}