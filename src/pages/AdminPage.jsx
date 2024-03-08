import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AdminPage = () => {
    const [cookies] = useCookies(['cookieAdmin']);
    const isAdmin = cookies.cookieAdmin;
    const navigate = useNavigate();
    const [auctionData, setAuctionData] = useState([]);
    const [carData, setCarData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [bidData, setBidData] = useState([]);

    const handleRedirect = () => {
        navigate('/loginPage');
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const auctionResponse = await axios.get('http://localhost:22502/allAuctions');
            const carResponse = await axios.get('http://localhost:22502/allCars');
            const userResponse = await axios.get('http://localhost:22502/allUsers');
            const bidResponse = await axios.get('http://localhost:22502/allBids');
            setAuctionData(auctionResponse.data);
            setCarData(carResponse.data);
            setUserData(userResponse.data);
            setBidData(bidResponse.data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const auctionElements = auctionData.map((auction) => {
        const date1 = new Date();
        const date2 = new Date(auction.EndDateTime);
        let auctionStatus;

        if(date2 < date1){
            auctionStatus = 'Finished'
        } else {
            auctionStatus = 'Ongoing'
        }
        return (
            <tbody key={auction.AuctionID}>
                    <tr  className="border border-tan">
                        <td className="p-2 border border-tan">{auction.AuctionID} </td>
                        <td className="p-2 border border-tan">{auction.CarID}</td>
                        <td className="p-2 border border-tan">{auction.EndDateTime}</td>
                        <td className="p-2 border border-tan">{auction.SellerID}</td>
                        <td className="p-2 border border-tan">{auction.StartDateTime}</td>
                        <td className="p-2 border border-tan">{auction.WinningBid}</td>
                        <td className="p-2 border border-tan">{auction.WinningUserID}</td>
                        <td className="p-2 border border-tan">{auctionStatus}</td>
                    </tr>
             
            </tbody>
        )
    });

    const carElements = carData.map((car) => {
        return (
            <tbody key={car.CarID} >
                    <tr>
                        <td className="p-2 border border-tan">{car.CarID} </td>
                        <td className="p-2 border border-tan">{car.Color}</td>
                        <td className="p-2 border border-tan">{car.Description}</td>
                        <td className="p-2 border border-tan">{car.Make}</td>
                        <td className="p-2 border border-tan">{car.Model}</td>
                        <td className="p-2 border border-tan">{car.Mileage}</td>  
                        <td className="p-2 border border-tan">{car.Year}</td>
                    </tr>
             
            </tbody>
        )
    });

    const userElements = userData.map((user) => {
        let adminStatus;
        if (user.Admin.data[0] === 1) {
            adminStatus = 'Yes';
        } else {
            adminStatus = 'No';
        }

        return (
            <tbody key={user.UserID} >
                    <tr>
                        <td className="p-2 border border-tan">{user.UserID} </td>
                        <td className="p-2 border border-tan">{user.Username}</td>
                        <td className="p-2 border border-tan">{user.AddressLine1}</td>
                        <td className="p-2 border border-tan">{user.AddressLine2}</td>

                        <td className="p-2 border border-tan">{user.Email}</td>  
                        <td className="p-2 border border-tan">{user.FirstName}</td>
                        <td className="p-2 border border-tan">{user.LastName}</td>
                        <td className="p-2 border border-tan">{user.PhoneNumber}</td>
                        <td className="p-2 border border-tan">{user.Postcode}</td>
                        <td className="p-2 border border-tan">{user.TownCity}</td>
                        <td className="p-2 border border-tan">{adminStatus}</td>
                    </tr>
            </tbody>
        )
    });

    const bidElements = bidData.map((bid) => {
        return (
            <tbody key={bid.BidID} >
                    <tr>
                        <td className="p-2 border border-tan">{bid.BidID} </td>
                        <td className="p-2 border border-tan">{bid.AuctionID}</td>
                        <td className="p-2 border border-tan">{bid.BidDateTime}</td>
                        <td className="p-2 border border-tan">{bid.CurrentBid}</td>
                        <td className="p-2 border border-tan">{bid.UserID}</td>
                    </tr>
             
            </tbody>
        )
    });

    return (
        <>
        {isAdmin === true ? (
            <>
            <div className='flex flex-col items-center pt-6'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3"> 
                    Admin Page
                </h1>
                </div>
                <div className="flex flex-col items-center">
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3  mt-6"> 
                    Auctions
                </h1>
        <table className="table-auto border border-tan bg-racing-green  text-tan p-2 mt-4">
            
            <thead className="border border-tan">
                <tr>
                    <th className="p-2 border border-tan">AuctionID</th>
                    <th className="p-2 border border-tan">CarID</th>
                    <th className="p-2 border border-tan">EndDateTime</th>
                    <th className="p-2 border border-tan">SellerID</th>
                    <th className="p-2 border border-tan">StartDateTime</th>
                    <th className="p-2 border border-tan">WinningBid</th>
                    <th className="p-2 border border-tan">WinningUserID</th>
                    <th className="p-2 border border-tan">AuctionStatus</th>
                </tr>
            </thead>
            {auctionElements}
        </table>
            </div>
        
        <div className="flex flex-col items-center">
        <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3  mt-6"> 
                    Cars
                </h1>
            <table className="table-auto border border-tan bg-racing-green  text-tan p-2 mt-4">
            <thead className='border border-tan'>
                <tr>
                    <th className="p-2 border border-tan">CarID</th>
                    <th className="p-2 border border-tan">Colour</th>
                    <th className="p-2 border border-tan">Description</th>
                    <th className="p-2 border border-tan">Make</th>
                    <th className="p-2 border border-tan">Model</th>
                    <th className="p-2 border border-tan">Mileage</th>
                    <th className="p-2 border border-tan">Year</th>
                </tr>
            </thead>
            {carElements}
        </table>
        </div>

        <div className="flex flex-col items-center">
        <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3  mt-6"> 
                    Users
                </h1>
            <table className="table-auto border border-tan bg-racing-green  text-tan p-2 mt-4">
            <thead className='border border-tan'>
                <tr>
                    <th className="p-2 border border-tan">UserID</th>
                    <th className="p-2 border border-tan">Username</th>
                    <th className="p-2 border border-tan">AddressLine1</th>
                    <th className="p-2 border border-tan">AddressLine2</th>
                    <th className="p-2 border border-tan">Email</th>
                    <th className="p-2 border border-tan">FirstName</th>
                    <th className="p-2 border border-tan">LastName</th>
                    <th className="p-2 border border-tan">PhoneNumber</th>
                    <th className="p-2 border border-tan">Postcode</th>
                    <th className="p-2 border border-tan">Town/City</th>
                    <th className="p-2 border border-tan">Admin</th>
                </tr>
            </thead>
            {userElements}
        </table>
        </div>
        <div className="flex flex-col items-center">
        <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3  mt-6"> 
                    Bids
                </h1>
            <table className="table-auto border border-tan bg-racing-green  text-tan p-2 mt-4 mb-4">
            <thead className='border border-tan'>
                <tr>
                    <th className="p-2 border border-tan">BidID</th>
                    <th className="p-2 border border-tan">AuctionID</th>
                    <th className="p-2 border border-tan">BidDateTime</th>
                    <th className="p-2 border border-tan">CurrentBid</th>
                    <th className="p-2 border border-tan">UserID</th>
                </tr>
            </thead>
            {bidElements}
        </table>
        </div>
       </>
            ) : (
                <div className='flex flex-col items-center pt-4'>
                <h1 className="flex flex-col items-center bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-lg w-1/3 mb-4"> 
                    You Need to be Using an Admin Account
                </h1>
                   <button onClick={handleRedirect} className="bg-tan text-racing-green rounded-xl p-2 transition duration-700 ease-in-out hover:opacity-60">Click here to Login</button>
              </div>
            )
            }
        </>
    );
}