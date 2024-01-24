import React from 'react';
import NavBar from './components/NavBar';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BuyingPage } from './pages/BuyingPage';
import { SellingPage } from './pages/SellingPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { AdminPage } from './pages/AdminPage';
import { FullCarDetailsPage } from './pages/FullCarDetailsPage';

function App() {
  return (
    <>
    <div className='bg-gray-950 min-h-screen'>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage/>}/>
          <Route path="buyingPage" element={<BuyingPage/>}/>
          <Route path="sellingPage" element={<SellingPage/>}/>
          <Route path="favouritesPage" element={<FavouritesPage/>}/>
          <Route path="adminPage" element={<AdminPage/>}/>
          <Route path="fullCarDetailsPage" element={<FullCarDetailsPage/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
