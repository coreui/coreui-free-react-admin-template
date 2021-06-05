import React, { Component, useState, useEffect } from 'react'
import {BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { uuid } from "uuidv4";
import api from "./api/Contact";
import './ContactComponents/App.css'



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Header =  React.lazy(() => import('./ContactComponents/Header')) 
const AddContact = React.lazy(() => import('./ContactComponents/AddContact')) 
const ContactList = React.lazy(() => import('./ContactComponents/ContactList')) 
const ContactDetail = React.lazy(() => import('./ContactComponents/ContactDetail')) 
const EditContact = React.lazy(() => import('./ContactComponents/EditContact')) 

const AddBrand = React.lazy(() => import('./views/pages/Brand/AddBrand')) 
const BrandList = React.lazy(() => import('./views/pages/Brand/BrandList')) 
const EditBrand = React.lazy(() => import('./views/pages/Brand/EditBrand')) 

function App() {

    const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  
  const [brands, setBrands] = useState([]);

  //Retrieve Brands
  const retrieveBrands = async () => {
    const response = await api.get("/brands");
    return response.data;
  };

  const addBrandHandler = async (brand) => {
    console.log(brand);
    const request = {
      id: uuid(),
      ...brand,
    };

    const response = await api.post("/brands", request);
    console.log(response);
    setContacts([...brands, response.data]);
  };

  const updateBrandHandler = async (brand) => {
    const response = await api.put(`/brands/${brand.id}`, brand);
    const { id, name, email } = response.data;
    setBrands(
      brands.map((brands) => {
        return brand.id === id ? { ...response.data } : brand;
      })
    );
  };

  const removeBrandHandler = async (id) => {
    await api.delete(`/brands/${id}`);
    const newBrandtList = brands.filter((brand) => {
      return brand.id !== id;
    });

    setBrands(newBrandtList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllBrands = async () => {
      const allBrands = await retrieveBrands();
      if (allBrands) setBrands(allBrands);
    };

    getAllBrands();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [brands]);
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>

          <Route
            exact path="/brand_details"
            
            render={(props) => (
              <BrandList
                {...props}
                brands={brands}
                getBrandId={removeBrandHandler}
              />
            )}
          />

          <Route
            path="/edit_brand"
            render={(props) => (
              <EditBrand
                {...props}
                updateBrandHandler={updateBrandHandler}
              />
            )}
          />
           <Route
            path="/add_brand"
            render={(props) => <AddBrand {...props} addBrandHandler={addBrandHandler} />}
          />


           

          <Route
            exact path="/details"
            
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
           <Route
            path="/add"
            render={(props) => <AddContact {...props} addContactHandler={addContactHandler} />}
          />

          <Route path="/contact/:id" component={ContactDetail} />





            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
}

export default App
