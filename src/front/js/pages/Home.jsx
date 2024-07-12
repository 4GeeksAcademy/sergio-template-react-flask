import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleDelete = async (item) => {
		//envía a la función setCurrentContact un item que guarda en store temporalmente  
		actions.setCurrentContact(item)
		// await espera la función actions.deleteContact() se complete antes de continuar 
		await actions.deleteContact()
		// Después de que el contacto ha sido eliminado, se llama a actions.getContacts() para actualizar la lista de contactos.
		actions.getContacts()
		// haciendo que quede vacío setCurrentContact
		actions.setCurrentContact({})
	};
	const handleEye = async (item) => {
		console.log(item);
		actions.setCurrentContact(item);
		// para irme al path de detalles necesito el useNavigatte
		navigate('/contact-detail')
	};
	const handleEdit = (item) => {
		actions.setCurrentContact(item);
		navigate('/edit-contact')
	};

	return (
			<div className="mt-5">
				<div className="d-flex justify-content-center">
					<div className="d-flex justify-content-end" style={{ width: "900px" }}>
						<Link to="/add-contact">
							<button type="button" className="btn btn-success mb-3">Añadir contacto</button>
						</Link>
					</div>
				</div>
			{store.contacts && store.contacts.map((item) => (
				<div key={item.id} className="d-flex justify-content-center">
					<div key={item.id} className="card mb-3" style={{ width: "900px" }}>
						<div className="row g-0">
							<div className="col-md-2 d-flex justify-content-center my-3">
								<div className="image">
									<img src="https://randomuser.me/api/portraits/women/79.jpg" className="img-fluid rounded-circle" alt="User portrait" />
								</div>
							</div>
							<div className="col-md-8">
								<div className="card-body">
									<h2 className="card-title">{item.name}</h2>
									<p className="text-muted mb-0"><i className="fa-solid fa-location-dot mx-3"></i> {item.address}</p>
									<p className="text-muted mb-0"><i className="fa-solid fa-phone mx-3"></i> {item.phone}</p>
									<p className="text-muted mb-0"><i className="fa-solid fa-envelope mx-3"></i> {item.email}</p>
								</div>
							</div>
							<div className="col-md-2 d-flex justify-content-center mt-5">
								<span>
									<i onClick={() => handleEye(item)} className="text-info fa-regular fa-eye fa-lg"></i>
								</span>
								<span className="px-4">
									<i onClick={() => handleEdit(item)} className="text-secondary fa-regular fa-pen-to-square fa-lg"></i>
								</span>
								<span>
									<i onClick={() => handleDelete(item)} className="text-danger fa-solid fa-trash-can fa-lg"></i>
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};



