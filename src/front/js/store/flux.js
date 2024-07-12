const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
            host: 'https://playground.4geeks.com/contact',
            user: 'agenda-sergio',
            currentContact: {},
			newContact: {}
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
// ---------------- FUNCION PARA TRAER CONTACTOS -------------------------
			getContacts: async () => {
				const url = `${getStore().host}/agendas/${getStore().user}/contacts`;
				const options = {
					method: 'GET'
				}
				const response = await fetch(url, options);
				if (!response.ok) {
                    console.log('error: ', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
				setStore({contacts: data.contacts});
			},
// ---------------- FUNCION PARA AÑADIR NUEVOS CONTACTOS -------------------------
			addContact: async (datatoSend) => {
				// POST /agendas/{slug}/contacts
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts`;
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(datatoSend)
				};
				const response = await fetch(uri, options);
				if(!response.ok) {
					console.log('Error' , response.status, response.statusText);
					return;
				}
			},
			setNewContact: (person) => {
				setStore({newContact: person})
			},
// ---------------- FUNCIONES PARA ELIMINAR CONTACTO ---------------------
            setCurrentContact: (contact) => {
                setStore({currentContact: contact});
            },
            deleteContact: async () => {
                const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${getStore().currentContact.id}`;
                const options = {
                    method: 'DELETE'
                };
                const response = await fetch(uri, options)
                if(!response.ok){
                    return;
                }
            },
			editContact: async (contactData) => {
				const store = getStore();
				const uri = `${store.host}/agendas/${store.user}/contacts/${store.currentContact.id}`;
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contactData)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error editing contact:', response.status, response.statusText);
					return;
				}
			}
		}
	};
};

export default getState;


