const ShortCarDetails = ({image, carName, price, time, miles, location}) => {
    const style = 'relative bg-racing-green m-4 rounded-xl p-1 flex flex-col items-center transition duration-700 ease-in-out hover:opacity-70 border border-tan';

    return (
        <div className={style}>
            <img className="" src={image}></img>
            <p className="absolute top-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-md"> 
                {carName}
            </p>
            <p className="absolute bottom-2 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan text-sm"> 
                £{price} {time}
            </p>
        </div>
    );
};

export default ShortCarDetails;