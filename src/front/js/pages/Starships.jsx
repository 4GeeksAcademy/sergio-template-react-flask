import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavbarStarWars } from "./NavbarStarWars.jsx";

export const Starships = () => {
    return (
        <div className="container-fluid bg-dark">
            <div className="row">
               <NavbarStarWars/>
            </div>
            <div className="row d-flex justify-content-center mt-5 pb-5">
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
                                <div className="card">
                                    <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5> 
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, est! Aliquam distinctio laudantium recusandae quasi iure dolor ipsum, doloremque doloribus!     
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <a href="#" className="btn btn-secondary">Details</a>
                                            <button type="button" class="btn btn-outline-warning"><i class="fa-regular fa-heart fa-lg"></i></button>
                                        </div>                          
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
                                <div className="card">
                                    <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5> 
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, est! Aliquam distinctio laudantium recusandae quasi iure dolor ipsum, doloremque doloribus!     
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <a href="#" className="btn btn-secondary">Details</a>
                                            <button type="button" class="btn btn-outline-warning"><i class="fa-regular fa-heart fa-lg"></i></button>
                                        </div>                          
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
                                <div className="card">
                                    <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5> 
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, est! Aliquam distinctio laudantium recusandae quasi iure dolor ipsum, doloremque doloribus!     
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <a href="#" className="btn btn-secondary">Details</a>
                                            <button type="button" class="btn btn-outline-warning"><i class="fa-regular fa-heart fa-lg"></i></button>
                                        </div>                          
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
                                <div className="card">
                                    <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5> 
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, est! Aliquam distinctio laudantium recusandae quasi iure dolor ipsum, doloremque doloribus!     
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <a href="#" className="btn btn-secondary">Details</a>
                                            <button type="button" class="btn btn-outline-warning"><i class="fa-regular fa-heart fa-lg"></i></button>
                                        </div>                          
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
