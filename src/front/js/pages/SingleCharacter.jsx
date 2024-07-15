import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SingleCharacter = () => {
    const { store } = useContext(Context);

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };
    // desestructuración del objeto
    const { properties } = store.currentCharacter;

    return (
        <div className="container-fluid bg-dark">
            <div className="row mt-5 pb-5">
                <div className="col-12 d-flex justify-content-center p-3">
                    <div className="card bg-dark text-white mb-3" style={{ width: "60rem" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                    src={`https://starwars-visualguide.com/assets/img/characters/${store.currentCharacter.uid}.jpg`} 
                                    className="card-img-top" 
                                    onError={handleErrorImg}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h1 className="card-title mx-5">{properties.name}</h1>
                                    <ul className="mx-5">
                                        <li><b>Height: </b>{properties.height}</li>
                                        <li><b>Mass: </b> {properties.mass}</li>
                                        <li><b>Gender: </b>{properties.gender}</li>
                                        <li><b>Hair Color: </b>{properties.hair_color}</li>
                                        <li><b>Skin Color: </b>{properties.skin_color}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


