import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const FullCarDetailsPage = () =>  {

    const urlParams = new URLSearchParams(window.location.search);
    const carID = urlParams.get('carID');
    console.log('CTHSIdf car isn aclled:', carID);

    const [carDetails, setCarDetails] = useState([]);
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            
            const response = await axios.get('http://localhost:22502/carDetails/' + carID);
            setCarDetails(response.data);
            console.log('sxfsdf', carDetails)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [carID]);

      function convertImg (image) {
        const convImg = "data:image/jpeg;base64,"+image;
        return convImg;
    }

    return (
        <>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                £50,000 1:00:00
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                {carDetails.Make} {carDetails.Model}
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <div className='bg-racing-green rounded-xl p-1 border border-tan lg:w-1/2 lg:h-1/2 sm:w-2/3 sm:h-2/3'>
                <img className='content-fit' src=''></img>
            </div>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <div className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                <p>Year: {carDetails.Year}</p>
                <p>Colour: {carDetails.Color}</p>
                <p>Mileage: {carDetails.Mileage}</p>
                <p>Description: {carDetails.Description}</p>
            </div>
        </div>
       
        </>
    );
}