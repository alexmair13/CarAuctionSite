import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const SellingPage = () => {
    const [cookies] = useCookies(['cookieName', 'cookieID']);
    const SellerID = cookies.cookieID;
    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate('/loginPage');
  };

 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        try {
          const response = await axios.post('http://localhost:22502/addCar', formData);
          const CarID = response.data.CarID;
          console.log("Car ID is", CarID);
          
          await axios.post('http://localhost:22502/startAuction/' + CarID + "/" + SellerID);
          console.log('Car submitted successfully');
          alert("You have successfully listed your car!");
          document.getElementById("sellCarForm").reset();
        } catch (error) {
          console.error('Error submitting car:', error);
        }
      };

    return (
        <>
         {cookies.cookieName ? ( 
         <div className='flex flex-col items-center pt-4'>
            <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                Sell Your Car
            </h1>
            <form id='sellCarForm' onSubmit={handleSubmit} action='/addCar' method='post' encType="multipart/form-data" className='bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan mt-4 w-1/2'>
                <label>Car Images:</label>
                <input type="file" name="carImages" id="carImages" accept="image/*" required/>
                <br></br>
                <label>Make:</label>
                <input type="text" name="make" id='make' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <label>Model:</label>
                <input type="text" name="model" id='model' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <label>Year:</label>
                <input type="number" name="year" id='year' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <label>Colour:</label>
                <input type="text" name="colour" id='colour' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <label>Mileage:</label>
                <input type="number" name="mileage" id='mileage' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <label>Description:</label>
                <input type="text" name="description" id='description' className="w-full p-2 mb-2 rounded-md text-black" required/>
                <button type="submit">Submit</button>
            </form>
        </div> 
        ) : (
          <div className='flex flex-col items-center pt-4'>
            <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 mb-4"> 
                Login to Sell Your Car
            </h1>
               <button onClick={handleRedirect} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Click here to Login or Register</button>
          </div>
        )
        }
        
       
        </>
    );
}