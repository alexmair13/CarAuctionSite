import React from 'react';

export const FullCarDetailsPage = ({image, make, model, miles, location, price, time}) =>  {
    return (
        <>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                £50,000 1:00:00
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                Porsche 911
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <div className='bg-racing-green rounded-xl p-1 border border-tan lg:w-1/2 lg:h-1/2 sm:w-2/3 sm:h-2/3'>
                <img className='' src='pictures/porsche911.jpeg'></img>
            </div>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <p className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                Car Details
            </p>
        </div>
       
        </>
    );
}