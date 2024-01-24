import ShortCarDetails from "../components/shortCarDetails";
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';


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

       const carElements = carData.map((car) => (
         <ShortCarDetails key={car.CarID} image='pictures/porsche911.jpeg' carMake={car.Make} carModel={car.Model}/>
       ));

    return (
        <>
         <div className=''>
         <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Listings
                </h1>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4'>
                <Link to="/fullCarDetailsPage">
                    {carElements}
                </Link>
                
            </div>
        </div>
            <Outlet/>
        </>
    );
}