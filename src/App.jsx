import React from 'react';
import NavBar from './components/NavBar';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BuyingPage } from './pages/BuyingPage';
import { SellingPage } from './pages/SellingPage';
import { MyAuctionsPage } from './pages/MyAuctionsPage';
import { AdminPage } from './pages/AdminPage';
import { FullCarDetailsPage } from './pages/FullCarDetailsPage';
import { LoginPage } from './pages/LoginPage';

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
          <Route path="myAuctionsPage" element={<MyAuctionsPage/>}/>
          <Route path="adminPage" element={<AdminPage/>}/>
          <Route path="fullCarDetailsPage" element={<FullCarDetailsPage/>}/>
          <Route path="loginPage" element={<LoginPage/>}/>
        </Route>
      </Routes>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
