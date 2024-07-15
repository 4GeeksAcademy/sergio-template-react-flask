import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
            <Link to="/">
                <img className="mx-5 mt-3" height={55} src="https://starwars.chocobar.net/star-wars-logo.png" />
            </Link>
            <div className="container-fluid mt-3 mx-3">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                        <li className="nav-item my-2 d-flex align-items-center">
                            <Link className="nav-link" to="/contact-list">
                                <button type="button" className="btn btn-secondary text-white">Contact List</button>
                            </Link>
                        </li>
                        <li className="nav-item my-2 d-flex align-items-center">
                            <Link className="nav-link" to="/">
                                <button type="button" className="btn btn-dark">Home</button>
                            </Link>
                        </li>
                        <li className="nav-item my-2 d-flex align-items-center">
                            <Link className="nav-link" to="/characters">
                                <button type="button" className="btn btn-dark">Characters</button>
                            </Link>
                        </li>
                        <li className="nav-item my-2 d-flex align-items-center">
                            <Link className="nav-link" to="/planets">
                                <button type="button" className="btn btn-dark">Planets</button>
                            </Link>
                        </li>
                        <li className="nav-item my-2 d-flex align-items-center">
                            <Link className="nav-link" to="/star-ships">
                                <button type="button" className="btn btn-dark">Starships</button>
                            </Link>
                        </li>
                        <div className="btn-group my-3">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Favoritos
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-black">
                                    {store.favorites.length}
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {store.favorites.length > 0 ? (
                                    store.favorites.map((favCount, index) => (
                                        <li key={index} className="d-flex justify-content-between align-items-center">
                                            <span className="dropdown-item">{favCount}</span>
                                            <button className="btn btn-danger btn-sm m-1" onClick={() => actions.deleteFavorite(favCount)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li><span className="dropdown-item">No hay favoritos todavía</span></li>
                                )}
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};



