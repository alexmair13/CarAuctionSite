// Popup component adapted from https://ericmwijage.medium.com/how-to-create-a-model-popup-using-tailwindclasses-with-react-js-17b262a4448d#:~:text=In%20this%20Short%20article%20i,lets%20dive%20into%20the%20codes.
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const PopUp = ({ openPopUp, closePopUp, carID, highestBid}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/loginPage');
  };

    const [errorMessage, setErrorMessage] = useState('');

    const [cookies] = useCookies(['cookieName', 'cookieID']);
    const username = cookies.cookieName;
    const userID = cookies.cookieID;

  const handlelosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopUp();
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const bid = formData.get('bid');

    if (!username) {
      console.log(username)
      setErrorMessage('You must be logged in to place a bid, either log in or create a new account in the Account section');
    } else {
    if (highestBid <= bid -100) {

    try {
        
      await axios.post('http://localhost:22502/placeBid/' + carID + "/" + bid + "/" + userID);
      alert("You have successfully placed a bid!");
      closePopUp();
      location.reload();
      console.log("Car ID is", carID, "bid: ", bid);

    } catch (error) {
      console.error('Error submitting car:', error);
    }
  } else {
    setErrorMessage('The bid must be higher than the current bid value by at least £100');
  }
}
}
  if (openPopUp !== true) return null

  

  return (
    <>
    {cookies.cookieName ? ( 
      <div id='ModelContainer' onClick={handlelosePopUp} className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
      <div className='p-2 bg-racing-green w-10/12 md:w-1/2 lg:1/3 shadow-inner rounded-xl text-tan border border-tan'>
        <div className='w-full p-3'>
          <h2 className='text-center text-xl pb-4'>
              Enter Bid Amount
          </h2>
          <form id="placeBid" onSubmit={handleSubmit} action={'/placeBid/' + carID} method='post'>
                <div className='flex justify-center items-center flex-col'>
                    <input type="number" name="bid" id='bid' min="100" max="100000000" className="w-2/3 p-2 mb-2 rounded-md text-black" required/>
                    <div className='flex justify-center'>
                        <button className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60" type="submit">Submit</button>
                    </div>
                    <div className='flex justify-center'>
                        <button className="border border-tan rounded-xl mt-2 p-2 transition duration-700 ease-in-out hover:opacity-60 " onClick={() => location.reload()} type="button">Close</button>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
          </form>
        </div>
      </div>
    </div>
    ) : (
      <div id='ModelContainer' onClick={handlelosePopUp} className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm'>
        <div className='p-2 bg-racing-green w-10/12 md:w-1/2 lg:1/3 shadow-inner rounded-xl text-tan border border-tan'>
          <div className='w-full p-3'>
            <h2 className='text-center text-xl pb-4'>
                You must be logged in to place a bid
            </h2>
              <button onClick={handleRedirect} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Click here to Login or Register</button>
          </div>
        </div>
      </div>
    ) 
    }
    </>
  )
}

export default PopUp