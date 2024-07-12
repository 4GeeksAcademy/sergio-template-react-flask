import React from "react";
import { Link } from "react-router-dom";

export const NavbarStarWars = () => {
	return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <img className="mx-5 mt-3" height={55} src="https://starwars.chocobar.net/star-wars-logo.png" />
        <div className="container-fluid mt-3">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                <li className="nav-itemC my-2 mx-4">
                    <Link to="/characters">
                        <a className="nav-link disabled text-decoration-none" aria-disabled="true">Characters</a>
                    </Link>
                </li>
                <li className="nav-item my-2">
                <Link to="/planets">
                        <a className="nav-link disabled text-decoration-none" aria-disabled="true">Planets</a>
                    </Link>
                </li>
                <li className="nav-item my-2 mx-4  text-decoration-none">
                <Link to="/star-ships">
                        <a className="nav-link disabled" aria-disabled="true">Starships</a>
                    </Link>
                </li>
                <div class="btn-group my-2">
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