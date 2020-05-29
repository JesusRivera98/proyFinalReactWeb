import React from 'react';
import "../App.css";
import UserProfile from '../Session';
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            apiURL: "http://localhost:8080",
            productId: "",
            comments: [],
            product: "",
        }
        this.logOut = this.logOut.bind(this);
        this.returnName = this.returnName.bind(this);
        this.saveComment = this.saveComment.bind(this);
    }

    componentWillMount(){
        this.setState({productId: localStorage.getItem('product')})
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
        console.log(this.state.productId)
        const url = `${this.state.apiURL}/product/id/?id=`+ this.state.productId;
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
                this.setState({product:responseJSON.name})
                responseJSON.comments.map(comment => {
                    this.setState(state => {
                        const comments = [...state.comments, comment ];

                        return {
                            comments,
                            value: '',
                        };
                    });
                    return comment;
                })
                console.log("this is", this.state);
            })
            .catch(err => {
                console.log("error", err.message);
            });

    }

    updateComment = (value) =>{
      this.setState({comment: value}); 
    }
    saveComment(){
        const url = `${this.state.apiURL}/products/comments`;
        console.log(this.state.id);
        let data = {
            productId: this.state.productId,
            userId: this.state.id,
            date: new Date(),
            comment: this.state.comment
        }
        console.log(data)
        
        let settings = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                sessiontoken: localStorage.getItem('token')
            },
            body: JSON.stringify(data),
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
                this.fetchProducts();                
            })
            .catch(err => {
                console.log("error", err.message);
            });
    }
    goToHome = () => {
        this.props.history.push('/home-page');
    }

    render() {
        //console.log("render",this.state.comments[0].firstName)
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
                            {this.state.product}
                        </h1>
                        <p>
                            This is the list of comments from your selected product, {this.state.firstName} {this.state.lastName} <br/>                            
                        </p>
                        <h2>
                            Comments
                        </h2>
                    </div>

                    {this.state.comments.map((comment, index) => {
                        return (
                            <div className="product">
                                <div className="infoPrice">
                                    <div className="productInfo">
                                        <h3 className="productName">
                                        {comment.comment}
                                        </h3>
                                        <p className="productDescription">
                                            {comment.user.firstName} {comment.user.lastName} ({comment.date})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <input type="text" className={`button-menu see inputNumber`} onChange={e => this.updateComment(e.target.value)}/>
                    <div>
                        <button onClick={this.saveComment} className="button-menu">
                            Add comment
                        </button>
                    </div>
                </section>
            </div>

        )
    }


}

export default Comments;