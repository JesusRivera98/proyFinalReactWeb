import React from 'react';
import {Link} from 'react-router-dom';
import "./App.css";
import UserProfile from './Session';
const {API_TOKEN, API_URL} = require('./config');
//const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            apiURL: `${API_URL}/`
        }
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
                this.setState({
                    firstName: responseJSON.firstName,
                    lastName: responseJSON.lastName,
                    email: responseJSON.email,
                    level: responseJSON.level
                });
                UserProfile.setName(responseJSON.firstName);
                console.log(responseJSON.level)                
            })
            .catch(err => {
                console.log(err.message);
                this.props.history.push('/');
            });
        switch(this.state.level){
            case "client":
                this.props.history.push('/profile-client');
                break;
            case "admin":
                this.props.history.push('/profile-admin');
                break;
            case "waiter":
                this.props.history.push('/profile-waiter');
                break;
            case "chef":
                this.props.history.push('/profile-chef');
                break;
            default:
                break;
        }      
    }
render( ){
    return(
        <div>
            <h1>
                This is the profile page
            </h1>   
            <Link to="/home-page" >
                Home
            </Link>         
        </div>
    )
}
}

export default Profile;

// Hooks, Context, Conditional Rendering