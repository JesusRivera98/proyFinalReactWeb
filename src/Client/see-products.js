import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class seeProducts extends React.Component {
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
        this.returnName = this.returnName.bind(this);
        //this.changeState = this.changeState.bind(this);
        this.startBill = this.startBill.bind(this);
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
                console.log(responseJSON.id);
                this.setState({
                    id: responseJSON.id,
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    email: responseJSON.email,
                    level: responseJSON.level
                });
                UserProfile.setName(responseJSON.firstName);
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
        this.fetchProducts();
    }
    returnName() {
        this.firstName = UserProfile.getCookie("name");
        return UserProfile.getCookie("name");
    }
    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }
    startBill() {
        let TheUrl = `${this.state.apiURL}/billsClient`;

        let total = 0;
        let selectedProducts = [];
        this.state.products.map(product => {
            if (product.state === 'Remove') {
                total += product.product.price;
                selectedProducts.push(product.product);
            }
            return product;
        })

        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts))

        console.log(total);
        let data = {
            date: new Date(),
            client: this.state.id,
            table: 'digital',
            total: total,
            open: true
            //waiter: waiter
        }
        console.log(data);

        let settings = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        //let results = document.querySelector( '.results' );

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
                localStorage.setItem('bill', responseJSON.id);
                this.props.history.push('/bills-current');
                //fetchBills();
            })
            .catch(err => {
                //results.innerHTML = `<div> ${err.message} </div>`;
            });

    }
    changeState = index => {
        this.setState(state => {
            const products = state.products.map((item, idx) => {
                if (idx === index) {
                    console.log(item, item.state)
                    if (item.state === 'Add') {
                        return { product: item.product, state: 'Remove' }
                    }
                    else {
                        return { product: item.product, state: 'Add' }
                    }
                } else {
                    return item;
                }
            });

            return {
                products,
            };
        });

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
        //let results = document.querySelector( '.results' );

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                //results.innerHTML = "";
                console.log(responseJSON);
                responseJSON.map((product, index) => {
                    this.setState(state => {
                        const products = [...state.products, { product: product, state: 'Add' }];

                        return {
                            products,
                            value: '',
                        };
                    });
                    return product;
                })
                console.log("this is", this.state);
            })
            .catch(err => {
                console.log("error", err.message);
                //this.state.setState({respuesta: err.message});
                /*results.innerHTML = `<div> ${err.message} </div>`;*/
            });

    }
    goToComment = id => {
        localStorage.setItem('product', id)
        this.props.history.push('/product-comments');

    }
    goToHome = () => {
        this.props.history.push('/home-page');
    }
    searchProduct = (event) => {
        const url = `${this.state.apiURL}/product/name?name=`+event.target.value;
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                sessiontoken: localStorage.getItem('token')
            }
        }
        //let results = document.querySelector( '.results' );

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                //results.innerHTML = "";
                console.log(responseJSON);
                this.setState({products:[]})
                responseJSON.map((product, index) => {
                    this.setState(state => {
                        const products = [...state.products, { product: product, state: 'Add' }];

                        return {
                            products,
                            value: '',
                        };
                    });
                    return product;
                })
                console.log("this is", this.state);
            })
            .catch(err => {
                console.log("error", err.message);
                //this.state.setState({respuesta: err.message});
                /*results.innerHTML = `<div> ${err.message} </div>`;*/
            });
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
                    <div>
                        <label>
                            Search
                        </label>
                        <input type="text" onChange={(e) => this.searchProduct(e)}/>
                    </div>
                    {this.state.products.map((product, index) => {
                        return (
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
                                    <button onClick={() => this.changeState(index)} className={`button-menu ${product.state} see`}>
                                        {product.state}
                                    </button>
                                    <button onClick={() => this.goToComment(product.product.id)} className="button-menu see">
                                        See comments
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <button onClick={this.startBill} className="button-menu">
                            Start bill
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default seeProducts;