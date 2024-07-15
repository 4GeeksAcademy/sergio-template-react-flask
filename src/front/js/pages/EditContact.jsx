import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setName(store.currentContact ? store.currentContact.name : "");
        setEmail(store.currentContact ? store.currentContact.email : "");
        setPhone(store.currentContact ? store.currentContact.phone : "");
        setAddress(store.currentContact ? store.currentContact.address : "");
    }, [store.currentContact]);
    

    const handleEditContact = async (event) => {
        event.preventDefault();
        const dataToSend = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        };
        await actions.setCurrentContact(store.currentContact); 
        await actions.editContact(dataToSend);
        await actions.getContacts();
        navigate('/contact-list');
    }

    return (
        <div className="container">
            <form onSubmit={handleEditContact}>
                <div className="d-flex justify-content-center mt-5">
                    <h1>Editar contacto</h1>
                </div>
                <div className="mb-3 mt-2">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nombre" 
                    value={name} 
                    onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Teléfono" 
                    value={phone} 
                    onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="mb-5">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Dirección" 
                    value={address} 
                    onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="d-flex justify-content-between my-3 mt-5">
                    <button type="submit" className="btn btn-success mr-3">Guardar</button>
                    <Link to="/contact-list">
                        <button type="reset" className="btn btn-danger">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
