import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown';

export const FullCarDetailsPage = () =>  {
    const [carDetails, setCarDetails] = useState([]);
    const [singleAuctionDetails, setSingleAuctionDetails] = useState([]);
    const [timeDiff, setTimeDiff] = useState(null);

    const urlParams = new URLSearchParams(window.location.search);
    const carID = urlParams.get('carID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carResponse, singleAuctionResponse] = await Promise.all([
          axios.get(`http://localhost:22502/carDetails/` + carID),
          axios.get(`http://localhost:22502/singleAuction/` + carID)
        ]);

        setCarDetails(carResponse.data);
        setSingleAuctionDetails(singleAuctionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [carID]);


const carElements = singleAuctionDetails.map((auction) => {
    const date1 = new Date();
    const date2 = new Date(auction.EndDateTime);
    const timeDiff = date2 - date1

    return (
        <Countdown key={auction.CarID} date={Date.now() + timeDiff} />
    )
});
  
        
      function convertImg (image) {
        const convImg = "data:image/jpeg;base64,"+image;
        return convImg;
    }

    const convertedCarPicutre = convertImg(carDetails.PictureBase64);
    return (
        <>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                £ {}
                {carElements}
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                {carDetails.Make} {carDetails.Model}
            </p>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <div className='bg-racing-green rounded-xl p-1 border border-tan lg:w-1/2 lg:h-1/2 sm:w-2/3 sm:h-2/3'>
                <img className='content-fit' src={convertedCarPicutre}></img>
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