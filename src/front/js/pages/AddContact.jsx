import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const AddContact = () => {
	const { actions } = useContext(Context);
	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

	const navigate = useNavigate();

	const handleAddContact = async (event) => {
		event.preventDefault();
		const datatoSend = {
			"name": name,
			"phone": phone,
			"email": email,
			"address": address
		};
		await actions.addContact(datatoSend)
		await actions.getContacts()
		navigate('/')
	}

	return (
		<div className="container">
			<form onSubmit={handleAddContact}>
				<div className="d-flex justify-content-center mt-5">
					<h1>Añadir nuevo contacto</h1>
				</div>
				<div className="mb-3 mt-2">
					<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nombre"
					value={name}
					onChange={(event) => setName(event.target.value)}/>
				</div>
				<div className="mb-3">
					<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Teléfono"
					value={phone}
					onChange={(event) => setPhone(event.target.value)}/>
				</div>
				<div className="mb-5">
					<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Dirección"
					value={address}
					onChange={(event) => setAddress(event.target.value)}/>
				</div>
				<div className="d-flex justify-content-between my-3 mt-5">
					<button type="submit" className="btn btn-success mr-3">Guardar</button>
					<Link to="/">
						<button type="reset" className="btn btn-link">Volver a contactos</button>
					</Link>
				</div>
			</form>
		</div>
	);
};