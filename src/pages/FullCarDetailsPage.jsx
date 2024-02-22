import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countdown, { zeroPad } from 'react-countdown';
import PopUp from '../components/Popup';
import { useCookies } from 'react-cookie';


export const FullCarDetailsPage = () =>  {
    const [carDetails, setCarDetails] = useState([]);
    const [singleAuctionDetails, setSingleAuctionDetails] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(['']);
    const [buyerDetails, setBuyerDetails] = useState(['']);
    const [cookies] = useCookies(['cookieID']);
    const currentUserID = cookies.cookieID;

    const [openPopup, setOpenPopup] = useState(false);
    const HandleRemovePopUp = () => setOpenPopup(false);

    const urlParams = new URLSearchParams(window.location.search);
    const carID = urlParams.get('carID');
    const won = urlParams.get('won');

    useEffect(() => {
      const fetchData = async () => {
          try {
              const [carResponse, singleAuctionResponse] = await Promise.all([
                  axios.get(`http://localhost:22502/carDetails/` + carID),
                  axios.get(`http://localhost:22502/singleAuction/` + carID)
              ]);
              setCarDetails(carResponse.data);
              setSingleAuctionDetails(singleAuctionResponse.data);

              const sellerID = singleAuctionResponse.data[0].SellerID
              const buyerID = singleAuctionResponse.data[0].WinningUserID
              const sellerResponse = await axios.get(`http://localhost:22502/userDetails/` + sellerID);
              const buyerResponse = await axios.get(`http://localhost:22502/userDetails/` + buyerID);
              setSellerDetails(sellerResponse.data);
              setBuyerDetails(buyerResponse.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, [carID]);


const auctionTimer = singleAuctionDetails.map((auction, index) => {
    const date1 = new Date();
    const date2 = new Date(auction.EndDateTime);
    const diff = date2 - date1;

    const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed && won === 'true' && sellerDetails.length > 0) {
          return (
            <div className='flex flex-col items-center pt-2' key={auction.CarID}>
                    <div className='flex flex-col items-center'>
                        <p className='bg-white text-racing-green border rounded-xl p-2'>
                          You won the auction!
                        </p>
                        <div className='border border-tan rounded-xl m-2 p-2 flex flex-col items-center'>
                          <h2 className='underline'>Contact the Seller</h2>
                        <p>
                          Username: {sellerDetails[0].Username}
                        </p>
                        <p>
                          Email: {sellerDetails[0].Email}
                        </p>
                        <p>
                          Phone: {sellerDetails[0].PhoneNumber}
                        </p>
                        </div>
                       
                    </div>
                </div>
          ); 
          } else if(completed && currentUserID === auction.SellerID && buyerDetails.length > 0) {
            return (
              <div className='flex flex-col items-center pt-2' key={auction.CarID}>
                    <div className='flex flex-col items-center'>
                        <p className='bg-white text-racing-green border rounded-xl p-2'>
                          Sold!
                        </p>
                        <div className='border border-tan rounded-xl m-2 p-2 flex flex-col items-center'>
                          <h2 className='underline'>Contact the Buyer</h2>
                        <p>
                          Username: {buyerDetails[0].Username}
                        </p>
                        <p>
                          Email: {buyerDetails[0].Email}
                        </p>
                        <p>
                          Phone: {buyerDetails[0].PhoneNumber}
                        </p>
                        </div>
                       
                    </div>
                </div>
            );
        } else if(completed) {
          return (
            <div className='flex flex-col items-center pt-4' key={auction.CarID}>
                    <div>
                        <p className='bg-white text-red-600 border rounded-xl p-2'>
                        Auction Ended
                        </p>
                    </div>
                </div>
          );
        } else if(currentUserID === auction.SellerID) {
          return(
          <div className='flex flex-col items-center pt-4' key={auction.CarID}>
                    <div>
                        <p className='bg-white text-red-600 border rounded-xl p-2'>
                        You can't bid on your own auction
                        </p>
                    </div>
                </div>
          )
        } else {
          return (
            <div className='flex flex-col items-center' key={auction.CarID}>
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
        <div className='flex flex-col  items-center pt-4' key={index}>
            <div className='flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-xl md:w-1/3'>
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
               
        <div className='flex flex-col items-center pt-4'>
            <p className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-2xl w-1/3"> 
                {carDetails.Make} {carDetails.Model}
            </p>
        </div>
        {auctionTimer} 
        <div className='flex flex-col items-center pt-4'>
            <div className='bg-racing-green rounded-xl p-1 border border-tan lg:h-2/3 md:w-3/4 sm:w-full sm:h-2/3'>
                <img className='content-fit' src={convertedCarPicutre} alt={`${carDetails.Make} ${carDetails.Model}`}></img>
                {/* <button class="absolute top-2 right-2 bg-racing-green text-tan p-2 rounded-xl m-2 border border-tan transition duration-700 ease-in-out hover:opacity-60">Favourite</button> */}
            </div>
        </div>
        <div className='flex flex-col items-center pt-4'>
            <div className="bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-xl w-2/3 mb-4"> 
                <p>Year: {carDetails.Year}</p>
                <p>Colour: {carDetails.Color}</p>
                <p>Mileage: {carDetails.Mileage}</p>
                <p>Description: {carDetails.Description}</p>
            </div>
        </div>
        </>
    );
}