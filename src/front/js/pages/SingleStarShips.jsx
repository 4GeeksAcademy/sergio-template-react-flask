import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SingleStarShips = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container-fluid bg-dark">
            <div className="row mt-5 pb-5">
                <div className="col-12 d-flex justify-content-center  p-3">
                <div className="card mb-3" style={{ width: "60rem" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src="https://starwars-visualguide.com/assets/img/starships/10.jpg" className="img-fluid rounded-start"/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">{store.currentStarShip.name}</h1>
                            <p>Model: {store.currentStarShip.model}</p>
                            <p>Manufacturer: {store.currentStarShip.manufacturer}</p>
                            <p>Class: {store.currentStarShip.starship_class}</p>
                            <p>Cost: {store.currentStarShip.cost_in_credits}</p>
                            <p>Speed: {store.currentStarShip.max_atmosphering_speed}</p>
                            <p>Hyperdrive Rating: {store.currentStarShip.model}</p>
                            <p>MGLT: {store.currentStarShip.MGLT}</p>  
                            <p>Length: {store.currentStarShip.length}</p>
                            <p>Cargo Capacity: {store.currentStarShip.cargo_capacity}</p>
                            <p>Mimimum Crew: {store.currentStarShip.crew}</p>
                            <p>Passengers: {store.currentStarShip.passengers}</p> 
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
