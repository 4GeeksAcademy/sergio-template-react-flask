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
            newContact: {},
            starships: [],
            planets: [],
            characters: [],
            currentPlanet: {},
            currentStarShip: {},
            currentCharacter: {},
            favorites: []
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
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
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    console.log('error: ', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ contacts: data.contacts });
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
                if (!response.ok) {
                    console.log('Error', response.status, response.statusText);
                    return;
                }
            },
            setNewContact: (person) => {
                setStore({ newContact: person });
            },
            // ---------------- FUNCIONES PARA ELIMINAR CONTACTO ---------------------
            setCurrentContact: (contact) => {
                setStore({ currentContact: contact });
            },
            deleteContact: async () => {
                const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${getStore().currentContact.id}`;
                const options = {
                    method: 'DELETE'
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
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
            },
            // --------------- GET STARSHIPS ---------------------------
            getStarship: async () => {
                const uri = `${process.env.URISWAPITECH}/api/starships`;
                const options = {
                    method: 'GET'
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log('Error: ', response.status.text, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ starships: data.results });
            },
            getSingleStarShip: async (uri) => {
                const response = await fetch(uri);
                if (!response.ok) {
                    console.log('Error: ', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                const { uid, properties } = data.result;
                // actualizar el estado global con un nuevo objeto para que tenga dos propiedades
                setStore({ currentStarShip: { uid, properties } });
            },
            getPlanets: async () => {
                const uri = `${process.env.URISWAPITECH}/api/planets`;
                const options = {
                    method: 'GET'
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log('Error: ', response.status.text, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ planets: data.results });
            },
            getSinglePlanet: async (uri) => {
                const response = await fetch(uri);
                if (!response.ok) {
                    console.log('Error: ', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                const { uid, properties } = data.result;
                // actualizar el estado global con un nuevo objeto para que tenga dos propiedades
                setStore({ currentPlanet: { uid, properties } });
            },
            getCharacters: async () => {
                const uri = `${process.env.URISWAPITECH}/api/people`;
                const options = {
                    method: 'GET'
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log('Error: ', response.status.text, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ characters: data.results });
            },
            getSingleCharacter: async (uri) => {
                const response = await fetch(uri);
                if (!response.ok) {
                    console.log('Error: ', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                const { uid, properties } = data.result;
                // actualizar el estado global con un nuevo objeto para que tenga dos propiedades
                setStore({ currentCharacter: { uid, properties } });
            },
            // --------------- AGREGAR FAVORITO ---------------------------
            addFavorite: (name) => {
                // obtnemos el store en ese momento
                const store = getStore();
                // Si el nombre no está en la lista, entonces añadimos el nombre a la caja de favoritos.
                // Coge todo lo que ya está en la lista de favoritos (...store.favorites) y añade el nuevo.
                if (!store.favorites.includes(name)) {
                    setStore({ favorites: [...store.favorites, name] });
                }
            },
            deleteFavorite: (name) => {
                //obtenemos el store en ese momento
                const store = getStore();
                // la funcion filter guarda/actualiza los nombres que no son iguales a name
                setStore({ favorites: store.favorites.filter(favorite => favorite !== name) });
            }
        }
    };
};

export default getState;
