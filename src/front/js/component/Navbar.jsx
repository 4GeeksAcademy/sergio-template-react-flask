import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
		<div className="container-fluid">
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav me-auto mb-2 mb-sm-0">
				<div className="mx-3">
					<Link to="/">
						<button className="btn btn-light">Contact List</button>
					</Link>
				</div>
				<div>
					<Link to="/start-wars">
						<button className="btn btn-secondary">Starwars</button>
					</Link>
				</div>
			</ul>
		</div>
		</div>
	</nav>
	);
};
