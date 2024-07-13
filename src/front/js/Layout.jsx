import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
// Import custom Component
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Import custom Pages
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { ContactDetail } from "./pages/ContactDetail.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx"
import { Characters } from "./pages/Characters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Starships } from "./pages/Starships.jsx";
import { SingleStarShips } from "./pages/SingleStarShips.jsx";
import { ContactList } from "./pages/ContactList.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404 />} path="*" />
                        <Route element={<ContactDetail />} path='/contact-detail' />
                        <Route element={<EditContact />} path='/edit-contact' />
                        <Route element={<AddContact />} path='/add-contact' />
                        <Route element={<Characters />} path='/characters' />
                        <Route element={<Planets />} path='/planets' />
                        <Route element={<Starships />} path='/star-ships' />
                        <Route element={<SingleStarShips />} path='/single-star-ships' />
                        <Route element={<ContactList />} path='/contact-list' />         
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
