import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const ShortCarDetails = ({image, carMake, carModel, price, endTime, miles, location}) => {
    const style = 'relative bg-racing-green m-4 rounded-xl p-1 flex flex-col items-center transition duration-700 ease-in-out hover:opacity-70 border border-tan';

    return (
        <div className={style}>
            <img className="object-contain" src={image}></img>
            <p className="absolute top-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-md"> 
                {carMake} {carModel}
            </p>
            <p className="absolute bottom-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-sm"> 
                £{price} <Countdown date={endTime} />
            </p>
        </div>
    );
};

export default ShortCarDetails;