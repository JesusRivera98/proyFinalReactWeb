import React from 'react';
import "../App.css";
//import UserProfile from '../Session';
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: "http://localhost:8080",
            products: []
        }

        this.logOut = this.logOut.bind(this);        
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount() {
        const url = `${this.state.apiURL}/api/validate-user`;
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
                //console.log(responseJSON.id);
                this.setState({
                    id: responseJSON.id,
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    email: responseJSON.email,
                    level: responseJSON.level
                });
                
                switch (this.state.level) {
                    case "Owner":
                    case "owner":
                        break;
                    case "Client":
                    case "client":
                        this.props.history.push('/home-client');
                        break;
                    case "Admin":
                    case "admin":
                        //this.props.history.push('/home-admin');
                        break;
                    case "Waiter":
                    case "waiter":
                        this.props.history.push('/home-waiter');
                        break;
                    case "Chef":
                    case "chef":
                        this.props.history.push('/home-chef');
                        break;
                    default:
                        localStorage.setItem('token', "");
                        this.props.history.push('/');
                        break;
                }

            })
            .catch(err => {
                console.log(err.message);
                this.props.history.push('/');
            });
    }

    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }
    goToHome = () => {
        this.props.history.push('/home-page');
    }
    addUser(event) {
        event.preventDefault();
        const firstName = event.currentTarget.firstName.value;
        const lastName = event.currentTarget.lastName.value;
        const level = event.currentTarget.level.value;
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;
        
        let TheUrl = `${this.state.apiURL}/users/`;

        let data = {
            firstName,
            lastName,
            level,
            email,
            password
        }
        console.log(data);

        let settings = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                sessiontoken: localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
        
        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log("response", responseJSON);
                window.location.reload()
            })
            .catch(err => {
                console.log(err.message);
            });

    }

    render() {
        console.log("nmbre", this.state.products[0])
        return (
            <div>
                <nav className="navbar">
                    <div className="hamburger">&#9776;</div>
                    <ul className="menu">
                        <li onClick={this.logOut} >LogOut</li>
                        <li onClick={this.goToHome} >Home</li>
                    </ul>
                </nav>

                <section className="Menu">
                    <div>
                        <h1>
                            Add User
                        </h1>
                        <h5>
                            Register a new user (Can be client, admin or chef)
                        </h5>
                    </div>
                    <form onSubmit={this.addUser} >
                        <div className="formUser">
                            <label className={``}>
                                firstName:
                            </label>
                            <input type="text" id="firstName" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                lastName:
                            </label>
                            <input type="text" id="lastName" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Level:
                            </label>
                            <input type="text" id="level" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                email:
                            </label>
                            <input type="email" id="email" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Password:
                            </label>
                            <input type="password" id="password" className={`button-menu see inputNumber`}/>
                        </div>

                        <div>
                            <button type="submit" className="button-menu">
                                Add User
                            </button>
                        </div>
                    </form>

                </section>
            </div>

        )
    }

}

export default AddUser;