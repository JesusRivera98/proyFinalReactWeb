import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class currentBills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: "http://localhost:8080",
            bills: [],
        }
        this.logOut = this.logOut.bind(this);
        this.returnName = this.returnName.bind(this);
        //this.changeState = this.changeState.bind(this);
        this.UpdateBills = this.UpdateBills.bind(this);
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
        this.fetchBills();
    }
    returnName() {
        this.firstName = UserProfile.getCookie("name");
        return UserProfile.getCookie("name");
    }
    logOut() {
        localStorage.setItem('token', "");
        this.props.history.push('/');
    }
    changeState = index => {
        this.setState(state => {
            const bills = state.bills.map((item, idx) => {
                if (idx === index) {
                    let aux = item;
                    if (item.open) {
                        aux['open'] = false;
                    }
                    else {
                        aux['open'] = true;
                    }
                    return aux;
                } else {
                    return item;
                }
            });

            return {
                bills,
            };
        });

    }
    fetchBills = () => {        
        this.setState({bills: []});
        const url = `${this.state.apiURL}/billsClient/open`;
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
                    if (bill.products.length === 0) {
                        this.fetchDeleteEmptyBill(bill.id);
                    }
                    else {
                        this.setState(state => {
                            const bills = [...state.bills, bill];

                            return {
                                bills,
                                value: '',
                            };
                        });
                    }
                    return bill;
                })
                console.log("this is", this.state);
            })
            .catch(err => {
                console.log("error", err.message);                
            });

    }
    fetchDeleteEmptyBill = id => {
        let TheUrl = `${this.state.apiURL}/billClient/` + id;

        let data = {
            id: id
        }

        let settings = {
            method: 'DELETE',
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
            })
            .catch(err => {
                console.log(err.message);
            });

    }
    status = value => {
        if(value){
            return 'Close'
        }
        else{
            return 'Open'
        }
    }
    goToSeeDetails = id => {
        localStorage.setItem('bill', id)
        this.props.history.push('/bill-details');

    }
    UpdateBills() {
        this.state.bills.map(bill =>{
            let TheUrl = `${this.state.apiURL}/billClient/` + bill.id;
            console.log(bill.open);
            let data = {id: bill.id, open: bill.open};
            console.log("data",data);
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
            return bill;         
        })      
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
                            Open Bills
                        </h1>
                        <p>
                            This is our bills list, {this.state.firstName} {this.state.lastName}
                        </p>
                    </div>

                    {this.state.bills.map((bill, index) => {
                        return (
                            <div className="product">
                                <div className="infoPrice">
                                    <div className="productInfo">
                                        <h3 className="productName">
                                            {bill.client}
                                        </h3>
                                        <p className="productDescription">
                                            {bill.date}
                                        </p>
                                    </div>
                                    <h3 className="price">
                                        Total: {bill.total}
                                    </h3>
                                    <h3>
                                        Payed: {String(!bill.open)}
                                    </h3>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => this.changeState(index)} className={`button-menu ${this.status(bill.open)} see`}>
                                        {this.status(bill.open)}
                                    </button>
                                    <button onClick={() => this.goToSeeDetails(bill.id)} className="button-menu see">
                                        See details
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <button onClick={this.UpdateBills} className="button-menu">
                            Update Bills
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default currentBills;