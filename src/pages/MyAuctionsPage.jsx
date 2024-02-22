import React from 'react';
import ShortCarDetails from '../components/shortCarDetails';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const MyAuctionsPage = () => {
    const [cookies] = useCookies(['cookieName', 'cookieID']);
    const username = cookies.cookieName;
    const userID = cookies.cookieID;
    const navigate = useNavigate();
    const [buyingCarData, setBuyingCarData] = useState([]);
    const [endedAuctionsData, setEndedAuctionsData] = useState([]);
    const [carData, setCarData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:22502/auctions');
            setCarData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
          const fetchUserBids = async () => {
              try {
                  const response = await axios.get('http://localhost:22502/userBids/' + userID);
                  const endedResponse = await axios.get('http://localhost:22502/endedSoldAuctions');
                  setBuyingCarData(response.data);
                  setEndedAuctionsData(endedResponse.data);
              } catch (error) {
                  console.error('Error fetching user bids:', error);
              }
          };
      
          fetchUserBids();
      }, [userID]);

      function convertImg (image) {
        const convImg = "data:image/jpeg;base64,"+image;
        return convImg;
        }
        
    const buyingCarElements = buyingCarData.map((car) => {
        const convertedCarImg = convertImg(car.Picture)
        const linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}`;
        
        const date1 = new Date();
        const date2 = new Date(car.EndDateTime);
        const timeDiff = date2 - date1
        
        if (date1 < date2) {
            if(userID == car.UserID && userID == car.WinningUserID) {
            return (
                <div  key={car.BidID} className='' >
                    <div className='flex flex-col items-center'>
                        <h2 className='flex flex-col items-center text-black p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 bg-green-500'>
                            Winning
                        </h2>
                    </div>
                    <Link to={linkWithParams}> 
                        <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} endTime={Date.now() + timeDiff} currentBid={car.WinningBid}/>    
                    </Link>
                </div>   
            )
            } else {
                return (
                <div  key={car.BidID} className='' >
                    <div className='flex flex-col items-center'>
                        <h2 className='flex flex-col items-center text-black p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 bg-red-400'>
                            Losing
                        </h2>
                    </div>
                    <Link to={linkWithParams}> 
                        <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} endTime={Date.now() + timeDiff} currentBid={car.WinningBid}/>    
                    </Link>
                </div> 
                )
            }
        } else {
            return;
        }
    });


    const carElements = carData.map((car) => {
        const convertedCarImg = convertImg(car.Picture)
        const linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}`;
        
        const date1 = new Date();
        const date2 = new Date(car.EndDateTime);
        const timeDiff = date2 - date1
        
        if(userID != car.SellerID) {
            return;
        } else {
        return (
            <Link key={car.CarID} to={linkWithParams}> 
                <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} endTime={Date.now() + timeDiff} currentBid={car.WinningBid}/>    
            </Link>
        )
        }
    });

    const endedAuctions = buyingCarData.map((car) => {
        const convertedCarImg = convertImg(car.Picture)
        let wonAuction = false;
        let linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}&won=false`;
        
        const date1 = new Date();
        const date2 = new Date(car.EndDateTime);
        const timeDiff = date2 - date1
        
        if (date1 > date2) {
            if(userID == car.UserID && userID == car.WinningUserID) {
                linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}&won=true`;
            return (
                <div  key={car.BidID} className='' >
                    <div className='flex flex-col items-center'>
                        <h2 className='flex flex-col items-center text-black p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 bg-green-500'>
                            Won
                        </h2>
                    </div>
                    <Link to={linkWithParams}> 
                        <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} currentBid={car.WinningBid}/>    
                    </Link>
                </div>   
            )
            } else {
                return (
                <div  key={car.BidID} className='' >
                    <div className='flex flex-col items-center'>
                        <h2 className='flex flex-col items-center text-black p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 bg-red-400'>
                            Lost
                        </h2>
                    </div>
                    <Link to={linkWithParams}> 
                        <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} currentBid={car.WinningBid}/>    
                    </Link>
                </div> 
                )
            }
        } else {
            return;
        }
    });

    const soldElements = endedAuctionsData.map((car) => {
        const convertedCarImg = convertImg(car.Picture)
        const linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}`;
        
        const date1 = new Date();
        const date2 = new Date(car.EndDateTime);
        const timeDiff = date2 - date1
        
        if(userID != car.SellerID) {
            return;
        } else {
        return (
            <Link key={car.CarID} to={linkWithParams}> 
                <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} currentBid={car.WinningBid}/>    
            </Link>
        )
        }
    });

    const handleRedirect = () => {
        navigate('/loginPage');
    };

    return (
        <>
        {cookies.cookieName ? ( 
            <>
           <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-2xl w-1/3"> 
                    My Auctions
                </h1>
            </div>
   
            <div className='flex flex-col items-center pt-4'>
                <h2 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Buying
                </h2>
            </div> 
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                    {buyingCarElements}
                </div>
                <div className='flex flex-col items-center pt-4'>
                <h2 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Selling
                </h2>
            </div> 
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                    {carElements}
                </div>
            <div className='flex flex-col items-center pt-4'>
                <h2 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Ended Auctions
                </h2>
            </div> 
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                    {endedAuctions}
                </div>
            <div className='flex flex-col items-center pt-4'>
                <h2 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Sold Cars
                </h2>
            </div> 
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                    {soldElements}
                </div>
            
            
            </>
            ) : (
                <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 mb-4"> 
                    Login to view your auctions
                </h1>
                   <button onClick={handleRedirect} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Click here to Login or Register</button>
              </div>
            )}
       </>
    );
}