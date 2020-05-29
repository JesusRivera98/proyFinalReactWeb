import React from 'react';
import "../App.css";
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class AddProduct extends React.Component {
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
        this.addProduct = this.addProduct.bind(this);
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
    addProduct(event) {
        event.preventDefault();
        const name = event.currentTarget.name.value;
        const description = event.currentTarget.description.value;
        const unit = event.currentTarget.unit.value;
        const cost = event.currentTarget.cost.value;
        const price = event.currentTarget.price.value;
        const stock = event.currentTarget.stock.value;
        
        let TheUrl = `${this.state.apiURL}/products/`;

        let data = {
            name,
            description,
            unit,
            cost,
            price,
            stock
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
                            Add new Product
                        </h1>
                        <p>
                            Add the product info, then you can add components
                        </p>
                    </div>
                    <form onSubmit={this.addProduct} >
                        <div className="formUser">
                            <label className={``}>
                                Name:
                            </label>
                            <input type="text" id="name" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Description:
                            </label>
                            <textarea id="description" className={`description`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Unit:
                            </label>
                            <input type="text" id="unit" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Cost:
                            </label>
                            <input type="text" id="cost" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Price:
                            </label>
                            <input type="number" id="price" className={`button-menu see inputNumber`}/>
                        </div>
                        <div className="formUser">
                            <label className={``}>
                                Stock:
                            </label>
                            <input type="number" id="stock" className={`button-menu see inputNumber`}/>
                        </div>

                        <div>
                            <button type="submit" className="button-menu">
                                Add Product
                            </button>
                        </div>
                    </form>

                </section>
            </div>

        )
    }
}

export default AddProduct;