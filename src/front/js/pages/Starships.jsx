import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const Starships = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetail = async (uri) => {
    console.log(uri);
    await actions.getSingleStarShip(uri)
    navigate('/single-star-ships')
    };

    const handleFavorite = (name) => {
        if (store.favorites.includes(name)) {
            actions.deleteFavorite(name);
        } else {
            actions.addFavorite(name);
        }
    };
    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="row d-flex justify-content-center mt-5 pb-5">
                <div className="col-10">
                    <div className="row">
                    {store.starships && store.starships.map((item) =>(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={item.uid}>
                                <div className="card">
                                <img 
                                        src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`} 
                                        className="card-img-top" 
                                        alt={item.name}
                                        onError={handleErrorImg} // Handle image error
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5> 
                                        <div className="d-flex justify-content-between">
                                        <button className="btn btn-secondary" onClick={() => handleDetail(item.url)}>Details</button>
                                        <button onClick={() => handleFavorite(item.name)} type="button" className="btn btn-outline-warning">
                                                <i className="fas fa-heart fa-lg"></i>
                                        </button>
                                        </div>                          
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
