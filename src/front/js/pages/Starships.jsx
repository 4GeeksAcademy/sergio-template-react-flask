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
    }

    return (
        <div className="container-fluid bg-dark">
            <div className="row d-flex justify-content-center mt-5 pb-5">
                <div className="col-10">
                    <div className="row">
                    {store.starships && store.starships.map((item) =>(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={item.uid}>
                                <div className="card">
                                    <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5> 
                                        <div className="d-flex justify-content-between">
                                        <button className="btn btn-secondary" onClick={() => handleDetail(item.url)}>Details</button>
                                            <button type="button" className="btn btn-outline-warning"><i className="fa-regular fa-heart fa-lg"></i></button>
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
