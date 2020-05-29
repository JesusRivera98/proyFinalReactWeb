//const uuid = require('uuid');
import React from 'react';
import "./Admin.css";
const {API_TOKEN, API_URL} = require('../config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: API_URL,
            bills: []
        }

        //this.logOut = this.logOut.bind(this);
        //this.returnName = this.returnName.bind(this);
        //this.sendBill = this.sendBill.bind(this);
        //this.changeQuantity = this.changeQuantity.bind(this);
        //this.fetchBills = this.fetchBills.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.goToUsers = this.goToUsers.bind(this);
        this.goToBills = this.goToBills.bind(this);
        this.goToProducts = this.goToProducts.bind(this);
        this.goToClients = this.goToClients.bind(this);
        //this.returnName = this.returnName.bind(this);
        //this.goToSeeProducts = this.goToSeeProducts.bind(this)
        //this.goToCurrentBills = this.goToCurrentBills.bind(this)
    }

    componentWillMount() {
        //this.fetchBills();
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
                        //this.props.history.push('/home-client');
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

    updateBillProductQuantityFetch(product, quantity, bill) {
        let TheUrl = '/bill/product/quantity';
        let data = {
            billId: bill,
            productId: product,
            quantity: quantity
        }
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
                console.log(responseJSON);
                this.fetchBills();
            })
            .catch(err => {
                console.log(err.message);
            });

    }
    addBillProductFetch(product, quantity, notes, bill) {
        let TheUrl = '/bills/products';
        let data = {
            billId: bill,
            productId: product,
            quantity: quantity,
            notes: notes
        }
        let settings = {
            method: 'POST',
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
                console.log(responseJSON);
                this.fetchBills();
            })
            .catch(err => {
                console.log(err.message);
            });

    }
    getBillOpenedFetch(open) {
        let TheUrl = '/bill/open/?open=' + open;

        let data = open

        console.log("data", data);
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    getBillClientedFetch(client) {
        let TheUrl = '/bill/client/?client=' + client;
        let data = client
        console.log("data", data);
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    getBillDatedFetch(date) {
        let TheUrl = '/bill/date/?date=' + date;

        let data = date

        console.log("data", data);
        let settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);

            })
            .catch(err => {
                console.log(err.message);
            });
    }
    updateBillFetch(date, open, table, total, client, id) {
        let TheUrl = '/bill/' + id;

        let data = {
            id: id,
            date: date,
            open: open,
            table: table,
            total: total,
            client: client
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
                console.log(responseJSON);
                this.fetchBills();
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    deleteBillFetch(id) {
        let TheUrl = '/bill/' + id;


        let data = {
            id: id
        }
        console.log("data", data);
        let settings = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            //'path variables' : data
        }

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
                this.this.fetchBills();
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    addBillFetch(date, open, table, total, client) {
        let TheUrl = '/bills';

        let data = {
            date: date,
            open: open,
            table: table,
            total: total,
            client: client
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

        fetch(TheUrl, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                console.log(responseJSON);
                this.fetchBills();
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    fetchBills = (event) => {
        event.preventDefault();
        console.log("fething blls")
        let url = `${this.state.apiURL}/billsClient`;
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
                responseJSON.map((bill) => {
                    console.log(bill)
                    this.setState(state => {
                            const bills = [...state.bills, bill];

                            return {
                                bills,
                                value: '',
                            };
                        });
                    return bill;                    
                })
            })
            .catch(err => {
                console.log(err.message);
            });

    }

    goToHome() {
        this.props.history.push('/home-page');
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

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="hamburger">&#9776;</div>
                    <ul className="menu">
                        <li onClick={this.goToHome} >Home</li>
                        <li onClick={this.goToUsers}>Users</li>
                        <li onClick={this.goToBills}>Bills</li>
                        <li onClick={this.goToProducts}>Products</li>
                        <li onClick={this.goToClients}>Clients</li>
                    </ul>
                </nav>
                <section>
                    <form className="bills-form" onSubmit={this.fetchBills}>
                        <label>
                            Click the buttton to get the full list of bills <br />
                        </label>
                        <button id="submit-btn" type="submit">
                            Get bills
                    </button>
                    </form>

                    <form className="add-bill-form" onSubmit={this.addBillFetch}>
                        <label>
                            Click the buttton to add a bill <br />
                        </label>
                        <label htmlFor="billDate">
                            Date:
                        </label>
                        <input type="date" id="billDate" />
                        <label htmlFor="billOpen">
                            Open:
                        </label>
                        <input type="text" id="billOpen" />
                        <label htmlFor="billTable">
                            Table:
                        </label>
                        <input type="text" id="billTable" />
                        <label htmlFor="billTotal">
                            Total:
                        </label>
                        <input type="text" id="billTotal" />
                        <label htmlFor="billClient">
                            Client:
                        </label>
                        <input type="text" id="billClient" />
                        <button type="submit">
                            Add bill
                        </button>
                    </form>

                    <form className="delete-bill-form" onSubmit={this.deleteBillFetch}>
                        <label>
                            Click the buttton to delete the bills by id <br />
                        </label>
                        <label htmlFor="billIdToDelete">
                            Id:
                        </label>
                        <input type="text" id="billIdToDelete" />
                        <button type="submit" id="deleteSubmit">
                            Delete bill
                        </button>
                    </form>

                    <form className="update-bill-form" onSubmit={this.updateBillFetch}>
                        <label>
                            Click the buttton to update bills by id <br />
                        </label>

                        <label htmlFor="updateBillDate">
                            Date:
                        </label>
                        <input type="date" id="updateBillDate" />

                        <label htmlFor="updateBillOpen">
                            Open:
                        </label>
                        <input type="text" id="updateBillOpen" />

                        <label htmlFor="updateBillTable">
                            Table:
                        </label>
                        <input type="text" id="updateBillTable" />

                        <label htmlFor="updateBillTotal">
                            Total:
                        </label>
                        <input type="text" id="updateBillTotal" />

                        <label htmlFor="updateBillClient">
                            client:
                        </label>
                        <input type="text" id="updateBillClient" />

                        <button type="submit">
                            Update bill
                        </button>
                        <label htmlFor="billIdToUpdate">
                            Id:
                        </label>
                        <input type="text" id="billIdToUpdate" />
                        </form>

                    <form className="add-bill-product-form" onSubmit={this.addBillProductFetch}>
                        <label>
                            Click the button to add a product to the bill<br />
                        </label>
                        <label htmlFor="productIdToAdd">
                            Product ID:
                        </label>
                        <input type="text" id="productIdToAdd" />
                        <label htmlFor="productQuantityToAdd">
                            Quantity:
                        </label>
                        <input type="text" id="productQuantityToAdd" />
                        <label htmlFor="productNotesToAdd">
                            Notes:
                        </label>
                        <input type="text" id="productNotesToAdd" />
                        <label htmlFor="billIdToAddProduct">
                            Bill ID:
                        </label>
                        <input type="text" id="billIdToAddProduct" />
                        <button type="submit">
                            Add product
                    </button>

                    </form>
                    <form className="update-bill-product-quantity-form" onSubmit={this.updateBillProductQuantityFetch}>
                        <label>
                            Click the button to update a product's quantity from the bill<br />
                        </label>
                        <label htmlFor="productQuantityToUpdate">
                            Quantity:
                        </label>
                        <input type="text" id="productQuantityToUpdate" />
                        <label htmlFor="productIdToUpdate">
                            Product ID:
                        </label>
                        <input type="text" id="productIdToUpdate" />
                        <label htmlFor="billIdToUpdateProduct">
                            Bill ID:
                        </label>
                        <input type="text" id="billIdToUpdateProduct" />
                        <button type="submit">
                            Update Quantity
                    </button>
                    </form>

                    <form className="get-dated-bills-form" onSubmit={this.getBillDatedFetch}>
                        <label>
                            Click the buttton to get the list of bills with a specific date <br />
                        </label>
                        <label htmlFor="billDateToGet">
                            Fecha:
                        </label>
                        <input type="date" id="billDateToGet" />
                        <button type="submit">
                            Get bills
                        </button>
                    </form>
                    <form className="get-opened-bills-form">
                        <label>
                            Click the buttton to get the list of bills with a specific open <br />
                        </label>
                        <label htmlFor="billOpenToGet">
                            Opene:
                    </label>
                        <input type="text" id="billOpenToGet" />
                        <button type="submit">
                            Get bills
                    </button>
                    </form>
                    <form className="get-cliented-bills-form">
                        <label>
                            Click the buttton to get the list of bills with a specific client <br />
                        </label>
                        <label htmlFor="billClientToGet">
                            Mesero:
                    </label>
                        <input type="text" id="billClientToGet" />
                        <button type="submit">
                            Get bills
                    </button>
                    </form>
                </section>
                <section className="results">
                    {this.state.bills.map(bill =>
                        <div>
                            <ul>
                                <li> Fecha: {bill.date} </li>
                                <li> Opene: {bill.open} </li>
                                <li> Mesa: {bill.table} </li>
                                <li> Total: {bill.total} </li>
                                <li> Mesero: {bill.client} </li>
                                <li> Id: {bill.id} </li>
                                <li>
                                    {bill.products.map(product =>
                                        <div>
                                            Product: {product.product}
                                        Quantity: {product.quantity}
                                        Notes: {product.notes}
                                        </div>
                                    )}

                                </li>
                            </ul>
                        </div>
                    )}
                </section>
            </div>

        )
    }
}

export default Bills;