import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown, { zeroPad } from 'react-countdown';
import PopUp from '../components/Popup';


export const FullCarDetailsPage = () =>  {
    const [carDetails, setCarDetails] = useState([]);
    const [singleAuctionDetails, setSingleAuctionDetails] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);
    const HandleRemovePopUp = () => setOpenPopup(false);

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


const auctionTimer = singleAuctionDetails.map((auction) => {
    const date1 = new Date();
    const date2 = new Date(auction.EndDateTime);
    const diff = date2 - date1;

    const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
          
          return (
            <div className='flex flex-col items-center pt-4'>
                    <div>
                        <p className='bg-white text-red-600 border rounded-xl p-2'>
                        Auction Ended
                        </p>
                    </div>
                </div>
          );
        } else {
          
          return (
            <div className='flex flex-col items-center'>
                {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                <div>
                    <button onClick={() => setOpenPopup(true)} className='bg-tan text-racing-green text-xl border rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60'>
                        Place a Bid
                    </button>
                </div>
                <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} carID={carID} key={auction.CarID} highestBid={auction.WinningBid}/>
            </div>
          );
        }
      };

    return (
        <div className='flex flex-col  items-center pt-4'>
            <div className='flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3'>
                <p className=''>£{auction.WinningBid}</p>
                <Countdown key={auction.CarID} date={Date.now() + diff} renderer={renderer} />
            </div>
        </div>
    )
});
        
    function convertImg (image) {
        const convImg = "data:image/jpeg;base64,"+image;
        return convImg;
    }
    const convertedCarPicutre = convertImg(carDetails.PictureBase64);

    return (
        <>    
        {auctionTimer}
        <div className='flex flex-col items-center pt-6'>
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
            <div className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 mb-4"> 
                <p>Year: {carDetails.Year}</p>
                <p>Colour: {carDetails.Color}</p>
                <p>Mileage: {carDetails.Mileage}</p>
                <p>Description: {carDetails.Description}</p>
            </div>
        </div>
        </>
    );
}