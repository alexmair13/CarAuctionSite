import ShortCarDetails from "../components/shortCarDetails";
import { Outlet, Link } from 'react-router-dom';


export const BuyingPage = () => {
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
                    <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911' price='50,000' time='1:00:00'> </ShortCarDetails>
                </Link>
                <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911'> </ShortCarDetails>
                <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911'> </ShortCarDetails>
                <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911'> </ShortCarDetails>
                <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911'> </ShortCarDetails>
                <ShortCarDetails image='pictures/porsche911.jpeg' carName='Porsche 911'> </ShortCarDetails>
            </div>
        </div>
            <Outlet/>
        </>
    );
}