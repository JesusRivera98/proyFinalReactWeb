import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class HomeAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            apiURL: "http://localhost:8080/"
        }
        this.returnName = this.returnName.bind(this);              
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
    goToSeeProducts() {
        this.props.history.push('/see-products');
    }
    goToSeeProductsAdmin = () => {
        this.props.history.push('/see-products-admin');
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
                        <button onClick={this.goToAddProduct} className="button-menu">
                            Add products
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToAddUser} className="button-menu">
                            Add users
                        </button>
                    </div>
                    <div >
                        <button onClick={this.goToClosedBills}  className="button-menu">
                            Closed bills
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToSeeProductsAdmin} className="button-menu">
                            See products
                        </button>
                    </div>
                    <div>
                        <button onClick={this.goToAdminComments} className="button-menu">
                            Admin Comments
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default HomeAdmin;