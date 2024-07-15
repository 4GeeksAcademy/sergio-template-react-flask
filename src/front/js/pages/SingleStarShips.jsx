import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SingleStarShips = () => {
    const { store } = useContext(Context);

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };
    // desestructuración del objeto
    const { properties } = store.currentStarShip;

    return (
        <div className="container-fluid bg-dark">
            <div className="row mt-5 pb-5">
                <div className="col-12 d-flex justify-content-center  p-3">
                <div className="card bg-dark text-white mb-3" style={{ width: "60rem" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/starships/${store.currentStarShip.uid}.jpg`} 
                            className="card-img-top" 
                            onError={handleErrorImg}
                        />
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title mx-5">{properties.name}</h1>
                            <ul className="mx-5">
                                <li><b>Model: </b>{properties.model}</li>
                                <li><b>Manufacturer: </b>{properties.manufacturer}</li>
                                <li><b>Class: </b>{properties.starship_class}</li>
                                <li><b>Cost: </b>{properties.cost_in_credits}</li>
                                <li><b>Speed: </b>{properties.max_atmosphering_speed}</li>
                                <li><b>Hyperdrive Rating: </b>{properties.model}</li>
                                <li><b>MGLT: </b>{properties.MGLT}</li>  
                                <li><b>Length: </b>{properties.length}</li>
                                <li><b>Cargo Capacity: </b>{properties.cargo_capacity}</li>
                                <li><b>Mimimum Crew: </b>{properties.crew}</li>
                                <li><b>Passengers: </b>{properties.passengers}</li> 
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
