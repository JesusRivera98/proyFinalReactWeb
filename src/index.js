import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import NoRouteMatch from './NoRouteMatch';
import Profile from './Profile';

import Home from './Home/Home';
import HomeChef from './Home/Home-Chef'
import HomeClient from './Home/Home-Client'
import HomeAdmin from './Home/Home-Admin'

import SeeProducts from './Client/see-products'
import CurrentBill from './Client/current-bill'
import ClientComments from './Client/comments'
import ServiceComments from './Client/service-comments'

import CurrentBills from './Chef/current-bills'
import ClosedBills from './Chef/closed-bills'
import BillDetails from './Chef/bill-details'
import SeeProductsChef from './Chef/see-products'
import UpdateProduct from './Chef/update-product'

import AddUser from './Admin/add-user'
import AddProduct from './Admin/add-product'
import AdminComments from './Admin/admin-comments'
import BillHistory from './Admin/bill-history'
import SeeComments from './Admin/see-comments'
import SeeProductsAdmin from './Admin/see-products'

import Bills from './Owner/Bills'
import Clients from './Owner/Clients'
import Products from './Owner/Products'
import Users from './Owner/Users'
import Comments from './Owner/Comments'
//import 

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/home-page" component={Home} />
      <Route exact path="/home-chef" component={HomeChef} />
      <Route exact path="/home-client" component={HomeClient} />
      <Route exact path="/home-admin" component={HomeAdmin} />

      <Route exact path="/profile-page" component={Profile} />

      <Route exact path="/see-products" component={SeeProducts} />
      <Route exact path="/bills-current" component={CurrentBill} />
      <Route exact path="/product-comments" component={ClientComments} />
      <Route exact path="/service-comments" component={ServiceComments} />

      <Route exact path="/current-bills" component={CurrentBills} />
      <Route exact path="/closed-bills" component={ClosedBills} />
      <Route exact path="/bill-details" component={BillDetails} />
      <Route exact path="/update-product" component={UpdateProduct} />
      <Route exact path="/see-products-chef" component={SeeProductsChef} />
      
      <Route exact path="/add-user" component={AddUser} />
      <Route exact path="/add-product" component={AddProduct} />
      <Route exact path="/admin-comments" component={AdminComments} />
      <Route exact path="/bill-history" component={BillHistory} />
      <Route exact path="/see-comments-admin" component={SeeComments} />
      <Route exact path="/see-products-admin" component={SeeProductsAdmin} />

      <Route exact path="/Bills" component={Bills} />
      <Route exact path="/Users" component={Users} />
      <Route exact path="/Products" component={Products} />
      <Route exact path="/Clients" component={Clients} />
      <Route exact path="/Comments" component={Comments} />
      <Route component={NoRouteMatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
