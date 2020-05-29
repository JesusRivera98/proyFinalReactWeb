import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            apiURL: `${API_URL}/`
        }
        this.logOut = this.logOut.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.goToUsers = this.goToUsers.bind(this);
        this.goToBills = this.goToBills.bind(this);
        this.goToProducts = this.goToProducts.bind(this);
        this.goToClients = this.goToClients.bind(this);
        this.returnName = this.returnName.bind(this);
        this.goToSeeProducts = this.goToSeeProducts.bind(this)
        this.goToCurrentBills = this.goToCurrentBills.bind(this)
    }

    

    componentDidMount() {
        const url = `${this.state.apiURL}api/validate-user`;
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                sessiontoken: localStorage.getItem('token')
            }
        };

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
                this.setState({
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    email: responseJSON.email,
                    level: responseJSON.level
                });
                UserProfile.setName(responseJSON.firstName);
                switch (this.state.level) {
                    case "Owner":
                        break;
                    case "client":
                        this.props.history.push('/home-client');
                        break;
                    case "admin":
                        this.props.history.push('/home-admin');
                        break;
                    case "waiter":
                        this.props.history.push('/home-waiter');
                        break;
                    case "chef":
                        this.props.history.push('/home-chef');
                        break;
                    default:
                        localStorage.setItem( 'token', "" );
                        this.props.history.push('/');
                        break;
                }

            })
            .catch(err => {
                console.log(err.message);
                this.props.history.push('/');
            });

    }

    returnName() {
        this.firstName = UserProfile.getCookie("name");
        return UserProfile.getCookie("name");
    }

    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }
    goToHome() {
        this.props.history.push('/home');
    }
    goToUsers() {
        this.props.history.push('/users');
    }
    goToBills() {
        this.props.history.push('/bills');
    }
    goToProducts() {
        this.props.history.push('/products');
    }
    goToClients() {
        this.props.history.push('/clients');
    }
    goToSeeProducts() {
        this.props.history.push('/see-products');
    }
    goToSeeProductsChef() {
        this.props.history.push('/see-products-chef');
    }
    goToAddUser = () => {
        this.props.history.push('/add-user');
    }
    goToAddProduct = () => {
        this.props.history.push('/add-product');
    }
    goToTodayBills = () => {
        this.props.history.push('/today-bills');
    }
    goToBillsHistory = () => {
        this.props.history.push('/bills-history');
    }
    goToAdminComments = () => {
        this.props.history.push('/admin-comments');
    }
    goToComments = () => {
        this.props.history.push('/comments');
    }
    goToServiceComments = () => {
        this.props.history.push('/service-comments');
    }
    goToUpdateProduct = () => {
        this.props.history.push('/update-product');
    }
    goToCurrentBills() {
        this.props.history.push('/current-bills');
    }
    goToClosedBills = () => {
        this.props.history.push('/closed-bills');
    }


    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="hamburger">&#9776;</div>
                    <ul className="menu">
                        <li onClick={this.logOut} >LogOut</li>
                        <li onClick={this.goToUsers} >Users</li>
                        <li onClick={this.goToBills} >Bills</li>
                        <li onClick={this.goToProducts} >Products</li>
                        <li onClick={this.goToClients} >Clients</li>
                    </ul>
                </nav>

                <section className="Menu">
                    <div>
                        <h1>
                            Home menu
                    </h1>
                        <p>
                            Welcome back {this.state.firstName} {this.state.lastName}
                        </p>
                    </div>
                    <div >
                        <button className="button-menu">
                            Create new bill
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToCurrentBills}  className="button-menu">
                            Current bills
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToClosedBills}  className="button-menu">
                            Closed bills
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToTodayBills} className="button-menu">
                            Today's Bills
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToBillsHistory} className="button-menu">
                            Bill history
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToAddUser} className="button-menu">
                            Add users
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToAddProduct} className="button-menu">
                            Add produts
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToSeeProducts} className="button-menu">
                            See products
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToSeeProductsChef} className="button-menu">
                            See products Chef
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToAdminComments} className="button-menu">
                            Admin Comments
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToComments} className="button-menu">
                            Comments
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToServiceComments} className="button-menu">
                            Sevice Comments
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToUpdateProduct} className="button-menu">
                            UpdateProduct
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default Home;