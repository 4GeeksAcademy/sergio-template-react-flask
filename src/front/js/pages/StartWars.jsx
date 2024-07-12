import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavbarStarWars } from "./NavbarStarWars.jsx";

export const StarWars = () => {
    return (
        <div className="container-fluid bg-dark">
            <div className="row">
            <NavbarStarWars />
            </div>
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-11 col-sm-11 col-md-9 col-lg-8">
                        <img className="w-100" src="https://starwars.chocobar.net/star-wars-back0.jpg"  />
                    </div>
                </div>
        </div>
    )
}



