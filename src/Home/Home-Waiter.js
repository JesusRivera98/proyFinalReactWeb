import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class HomeWaiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            apiURL: `${API_URL}/`
        }
        this.logOut = this.logOut.bind(this);
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
                        <button className="button-menu">
                            Create new bill
                    </button>
                    </div>
                    <div >
                        <button className="button-menu">
                            Current bills
                    </button>
                    </div>
                    <div >
                        <button className="button-menu">
                            Today's Bills
                    </button>
                    </div>
                    <div >
                        <button className="button-menu">
                            Bill history
                    </button>
                    </div>
                    <div >
                        <button className="button-menu">
                            Add user
                    </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default HomeWaiter;