import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SinglePlanet = () => {
    const { store } = useContext(Context);

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };
// desestructuración del objeto
    const { properties } = store.currentPlanet;

    return (
        <div className="container-fluid bg-dark">
            <div className="row mt-5 pb-5">
                <div className="col-12 d-flex justify-content-center  p-3">
                <div className="card mb-3 bg-dark text-white" style={{ width: "60rem" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/planets/${store.currentPlanet.uid}.jpg`} 
                            className="card-img-top" 
                            onError={handleErrorImg}
                        />
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title mx-5">{properties.name}</h1>
                            <ul className="mx-5">
                                <li><b>Population: </b>{properties.population}</li>
                                <li><b>Rotation Period: </b>{properties.rotation_period}</li>
                                <li><b>Orbital Period: </b>{properties.orbital_period}</li>
                                <li><b>Diameter: </b>{properties.diameter}</li>
                                <li><b>Gravity: </b>{properties.gravity}</li>
                                <li><b>Terrain: </b>{properties.terrain}</li>
                                <li><b>Surface Water: </b>{properties.surface_water}</li>  
                                <li><b>Climate: </b>{properties.climate}</li>
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