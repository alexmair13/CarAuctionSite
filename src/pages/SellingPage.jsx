import React from 'react';

export const SellingPage = () => {
    return (
        <>
        <div className='flex flex-col items-center pt-4'>
            <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                Sell Your Car
            </h1>
            <div className='bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan mt-4 w-1/2'>
                <form id="uploadForm" enctype="multipart/form-data">
                    <input type="file" id="fileInput" accept="image/*"/>
                    <button type="button" onclick=""> Upload Car Images</button>
                </form>
            </div>
            <div className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan mt-4 w-1/2">
                <form id="carDetailsForm">
                    <label>Make:</label>
                    <input type="text" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Model:</label>
                    <input type="text" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Year:</label>
                    <input type="number" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Colour:</label>
                    <input type="text" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Milage:</label>
                    <input type="number" className="w-full p-2 mb-2 rounded-md text-black" />
                    <label>Description:</label>
                    <input type="text" className="w-full p-2 mb-2 rounded-md text-black" />
                    <button type="button" onclick="">Submit</button>
                </form>
            </div>
        </div>
       
        </>
    );
}