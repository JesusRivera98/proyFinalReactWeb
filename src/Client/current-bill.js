import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class CurrentBill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: API_URL,
            products : []
        }

        this.logOut = this.logOut.bind(this);
        this.returnName = this.returnName.bind(this);
        this.sendBill = this.sendBill.bind(this);
        //this.changeQuantity = this.changeQuantity.bind(this);
    }
    
    componentWillMount() {
        let products = JSON.parse(localStorage.getItem('selectedProducts'));
        //this.setState({ products: {product:JSON.parse(algo), quantity: 1}});
        products.map((product, index) => {
            this.setState(state => {
                console.log(product)
                const products = [...state.products, { product: product, quantity: 1, notes: "" }];

                return {
                    products,
                    value: '',
                };
            });
            return product;
        })
        console.log(products);
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
                UserProfile.setName(responseJSON.firstName);
                console.log(this.state.products[0].name)
                switch (this.state.level) {
                    case "Owner":
                    case "owner":
                        break;
                    case "Client":
                    case "client":
                        //this.props.history.push('/home-client');
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
    returnName() {
        this.firstName = UserProfile.getCookie("name");
        return UserProfile.getCookie("name");
    }
    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }
    sendBill() {
        let id = localStorage.getItem('bill')
        let TheUrl = `${this.state.apiURL}/billClient/` + id;

        let total = 0;
        let products = [];
        console.log(this.state);
        this.state.products.map(product =>{
            if(product.quantity > 0){
                total += product.product.price * product.quantity;
                products.push({product:product.product.id, quantity: product.quantity, notes : product.notes});
            }   
            return product; 
        })

        let data = {
            id: id,
            date: "",
            client: "",
            table: "",
            total: total,
            open: "",
            products: products
        }
        console.log(data);

        let settings = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
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
                localStorage.removeItem('selectedProducts');
                localStorage.removeItem('bill');
                this.props.history.push('/home-page');
            })
            .catch(err => {
                //results.innerHTML = `<div> ${err.message} </div>`;
                console.log(err.message);
            });

    }
    changeQuantity = (value, index) =>{
        console.log(value, index)
        this.setState(state => {
            const products = state.products.map((item, idx) => {
                if (idx === index) {
                    return { product: item.product, quantity: value, notes: item.notes }                    
                } else {
                    return item;
                }
            });

            return {
                products,
            };
        });

    }
    changeNotes = (value, index) =>{
        console.log(value, index)
        this.setState(state => {
            const products = state.products.map((item, idx) => {
                if (idx === index) {
                    return { product: item.product, quantity: item.quantity, notes: value }                    
                } else {
                    return item;
                }
            });

            return {
                products,
            };
        });

    }
    goToComment = id => {
        localStorage.setItem('product', id)
        this.props.history.push('/product-comments');

    }

    render() {
        console.log("nmbre", this.state.products[0])
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
                            Menu
                        </h1>
                        <p>
                            These are your selected products, {this.state.firstName} {this.state.lastName}
                        </p>
                    </div>
                    {this.state.products.map((product, index) => {
                        return (
                            <div>
                                <div className="product">
                                    <div className="infoPrice">
                                        <div className="productInfo">
                                            <h3 className="productName">
                                                {product.product.name}
                                            </h3>
                                            <p className="productDescription">
                                                {product.product.description}
                                            </p>
                                        </div>
                                        <h2 className="price">
                                            ${product.product.price}
                                        </h2>
                                    </div>
                                    <div className="buttons">
                                        <input type="number"  className={`button-menu see inputNumber`} onChange={e => this.changeQuantity(e.target.value,index)}/>
                                        <button onClick={() => this.goToComment(product.product.id)} className="button-menu see">
                                            See comments
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className={``}>
                                        Notas
                                </label>
                                    <input type="text" className={`button-menu see inputNumber`} onChange={e => this.changeNotes(e.target.value,index)}/>
                                </div>
                            </div>

                        )
                    })}

                    <div>
                        <button onClick={this.sendBill} className="button-menu">
                            Send bill
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default CurrentBill;