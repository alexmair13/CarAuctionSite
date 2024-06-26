import ShortCarDetails from "../components/shortCarDetails";
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from "react";

export const BuyingPage = () => {

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

      function convertImg (image) {
        const convImg = "data:image/jpeg;base64,"+image;
        return convImg;
        }

    const carElements = carData.map((car) => {
        const convertedCarImg = convertImg(car.Picture)
        const linkWithParams = `/fullCarDetailsPage?carID=${car.CarID}`;
        
        const date1 = new Date();
        const date2 = new Date(car.EndDateTime);
        const timeDiff = date2 - date1

        return (
            <Link key={car.CarID} to={linkWithParams}> 
                <ShortCarDetails image={convertedCarImg} carMake={car.Make} carModel={car.Model} endTime={Date.now() + timeDiff} currentBid={car.WinningBid}/>    
            </Link>
        )
    });

    

    return (
        <> 
         <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Listings
                </h1>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                {carElements}
            </div>
            
            <Outlet/>
        </>
    );
}