import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactDetail = () => {
	const { store } = useContext(Context);

    return (
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center my-5">
                    <div className="card" style={{ width: "30rem" }}>
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="card-img-top"/>
                        <div className="card-body">
                            <h2 className="card-title">{store.currentContact.name}</h2>
                            <p className="text-muted mb-0"><i className="fa-solid fa-location-dot mx-3"></i> {store.currentContact.address}</p>
							<p className="text-muted mb-0"><i className="fa-solid fa-phone mx-3"></i> {store.currentContact.phone}</p>
							<p className="text-muted mb-5"><i className="fa-solid fa-envelope mx-3"></i> {store.currentContact.email}</p>
                            <Link to="/">
                                <button className="btn btn-secondary">Volver a todos los contactos</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}