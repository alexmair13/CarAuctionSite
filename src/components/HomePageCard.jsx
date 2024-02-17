const HomePageCard = ({text, image}) => {
    const style = 'relative bg-racing-green m-2 rounded-xl p-2 sm:max-w-full md:max-w-72 flex flex-col items-center transition duration-700 ease-in-out hover:opacity-60 border border-tan';

    return (
        <div className={style}>
            <img className="opacity-75" src={image}></img>
            <button className="absolute bottom-12 bg-racing-green text-tan p-2 overflow-hidden rounded-xl border border-tan"> 
                {text}
            </button>
        </div>
    );
};

export default HomePageCard;