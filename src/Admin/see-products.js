import React from 'react';
import "../App.css";
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class SeeProductsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: API_URL,
            products: []
        }
        this.logOut = this.logOut.bind(this);
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
        this.fetchProducts();
    }

    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }


    fetchProducts = () => {
        const url = `${this.state.apiURL}/products`;
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
                responseJSON.map(product => {
                    this.setState(state => {
                        const products = [...state.products, product];

                        return {
                            products,
                            value: '',
                        };
                    });

                    return product;
                })
            })
            .catch(err => {
                console.log("error", err.message);
            });

    }
    goToComment = id => {
        localStorage.setItem('product', id)
        this.props.history.push('/product-comments-chef');

    }
    goToHome = () => {
        this.props.history.push('/home-page');
    }


    render() {
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
                            Menu
                        </h1>
                        <p>
                            This is our products list, {this.state.firstName} {this.state.lastName}
                        </p>
                    </div>

                    {this.state.products.map(product => {
                        return (
                            <div className="productChef">
                                <div className="infoChef">
                                    <div className="dataChef">
                                        <div className="descriptiveChef">
                                            <h3 className="nameChef">
                                                {product.name}
                                            </h3>
                                            <p className="descriptionChef">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="valuesChef">
                                            <h4 className="valueChef">
                                                Price: ${product.price}
                                            </h4>
                                            <h4 className="valueChef">
                                                Stock: {product.stock}
                                            </h4>
                                        </div>
                                    </div>
                                    <div>
                                        <ul className="components">
                                            {product.components.map(component =>
                                                <li>
                                                    {component.quantity} {component.product} ({component.notes})
                                            </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>

        )
    }

}

export default SeeProductsAdmin;