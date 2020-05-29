import React from 'react';
import "../App.css";
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class BillDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: API_URL,
            bill: {}
        }

        this.logOut = this.logOut.bind(this);
        //this.updateProduct = this.updateProduct.bind(this);
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
                console.log("didMount", responseJSON.id);
                this.setState({
                    id: responseJSON.id,
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    email: responseJSON.email,
                    level: responseJSON.level,
                    bill: JSON.parse(localStorage.getItem('billtoDetails'))
                });

                //this.fetchProduct();

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
                        this.props.history.push('/home-admin');
                        break;
                    case "Waiter":
                    case "waiter":
                        this.props.history.push('/home-waiter');
                        break;
                    case "Chef":
                    case "chef":
                        //this.props.history.push('/home-chef');
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

    fetchProduct = () => {
        const url = `${this.state.apiURL}/billClient/id/?id=` + this.state.productId;
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                sessiontoken: localStorage.getItem('token')
            }
        }

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
                //this.setState({product:responseJSON.name})
                this.setState({ bill: responseJSON })
            })
            .catch(err => {
                console.log("error", err.message);
            });

    }

    render() {
        console.log("nmbre", this.state.bill)
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
                            Bill Details
                        </h1>
                        <p>
                            These are the details of your selected bill, {this.state.firstName} {this.state.lastName}
                        </p>
                    </div>
                    <div className="product">
                        <div className="infoPrice">
                            <div className="productInfo">
                                <h3 className="productName">
                                    {this.state.bill.client}
                                </h3>
                                <p className="productDescription">
                                    {this.state.bill.date}
                                </p>
                            </div>
                            <h3 className="price">
                                Total: {this.state.bill.total}
                            </h3>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    Open: {String(this.state.bill.open)}
                                </li>
                                <li>

                                    {this.state.bill.id}
                                </li>

                            </ul>
                        </div>

                    </div>
                </section>
            </div>


        )
    }
}

export default BillDetails;