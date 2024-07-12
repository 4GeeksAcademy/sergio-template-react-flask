import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
        <Link to="/">
            <img className="mx-5 mt-3" height={55} src="https://starwars.chocobar.net/star-wars-logo.png" />
        </Link>
        <div className="container-fluid mt-3 mx-3">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                <li className="nav-item my-2 mx-4 d-flex align-items-center">
                    <Link className="nav-link" to="/contact-list">
                        <button type="button" class="btn btn-secondary text-white">Contact List</button>
                    </Link>
                </li>
                <li className="nav-item my-2 mx-4 d-flex align-items-center">
                    <Link className="nav-link" to="/">
                        <button type="button" class="btn btn-dark text-secondary">Home</button>
                    </Link>
                </li>
                <li className="nav-item my-2 mx-4 d-flex align-items-center">
                    <Link className="nav-link" to="/characters">
                        <button type="button" class="btn btn-dark text-secondary">Characters</button>
                    </Link>
                </li>
                <li className="nav-item my-2 mx-4 d-flex align-items-center">
                    <Link className="nav-link" to="/planets">
                        <button type="button" class="btn btn-dark text-secondary">Planets</button>
                    </Link>
                </li>
                <li className="nav-item my-2 mx-4 d-flex align-items-center">
                    <Link className="nav-link" to="/star-ships">
                        <button type="button" class="btn btn-dark text-secondary">Starships</button>
                    </Link>
                </li>
                <div class="btn-group my-3 mx-4">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-black">
                            0
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><button class="dropdown-item" type="button">Action</button></li>
                        <li><button class="dropdown-item" type="button">Another action</button></li>
                        <li><button class="dropdown-item" type="button">Something else here</button></li>
                    </ul>
                </div>
            </ul>
        </div>
        </div>
    </nav>
	);
};
