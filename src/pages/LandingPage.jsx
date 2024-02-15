import React from 'react';
import HomePageCard from '../components/HomePageCard';
import { Outlet, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const LandingPage = () => {
    const [cookies] = useCookies(['cookieName', 'cookieID']);
    const username = cookies.cookieName;
    const userID = cookies.cookieID;
    return (
        <>
        <div className='flex justify-center pt-6'>
            <div className='flex justify-center p-4 text-xl bg-racing-green rounded-xl border border-tan w-1/2'>
                <h2 className='text-tan'>Welcome {username} ID: {userID}</h2>
            </div>
        </div>
        <div className='flex justify-center pt-6 min-h-screen'>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1'>
                <Link to="/buyingPage">
                    <HomePageCard text="Buy" image="pictures/Enzo2.jpeg"></HomePageCard>
                </Link>
                <Link to="/sellingPage">
                    <HomePageCard text="Sell" image="pictures/Enzo2.jpeg"></HomePageCard>
                </Link>
                <Link to="/favouritesPage">
                    <HomePageCard text="Favourites" image="pictures/Enzo2.jpeg"></HomePageCard>
                </Link>
            </div>
            </div>
            <Outlet/>
        </>
    );
}