import React from 'react';
import {useState, useEffect} from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
function FavoriteButton({isFavorite, callback}){
    
    const [isFavorited, setIsFavorited] = useState(isFavorite);
    useEffect(() => {
        setIsFavorited(isFavorite);
    }, [isFavorite]);

    const buttonPressed = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callback();
        setIsFavorited(!isFavorited);
    }
    return(
        <div className="favoriteButton">
            <button className='favoriteButton' onClick={buttonPressed}>
                {isFavorited ? <FaHeart/> : <CiHeart/>}
            </button>
        </div>
    )
}

export default FavoriteButton;