import React from 'react';
import HomePageCard from '../components/HomePageCard';
import { Outlet, Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <>
        <div className='flex justify-center items-center pb-32 min-h-screen'>
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