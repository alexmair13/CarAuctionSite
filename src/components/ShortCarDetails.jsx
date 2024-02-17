import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const ShortCarDetails = ({image, carMake, carModel, currentBid, endTime}) => {
    const style = 'relative bg-racing-green m-4 rounded-xl p-1 flex flex-col items-center transition duration-700 ease-in-out hover:opacity-70 border border-tan h-60 overflow-hidden';

    return (
        <div className={style}>
            <img className="w-auto h-full" src={image} alt={`${carMake} ${carModel}`}></img>
            <p className="absolute top-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-md"> 
                {carMake} {carModel}
            </p>
            <p className="absolute bottom-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-sm"> 
                £{currentBid} <Countdown date={endTime} />
            </p>
        </div>
    );
};

export default ShortCarDetails;