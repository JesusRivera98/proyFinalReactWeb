import React from "react";
import "./App.css";
const API_TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      apiURL : "http://localhost:8080/",
      errorMessage : ""
    };
  }

  handleLogin = (event) => {
    event.preventDefault();const userEmail = event.currentTarget.userEmail.value;
    const userPassword = event.currentTarget.userPassword.value;

    const url = `${this.state.apiURL}api/users/login`;

    const data = {
      email: userEmail,
      password: userPassword,
    };

    const settings = {
      method: "POST",
      headers: {
        Authorization : `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };

    fetch(url, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responeJSON) => {
        localStorage.setItem( 'token', responeJSON.token );
        
        this.props.history.push('/home-page');
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          errorMessage : err.message
        })
      });
  };

  render() {
    return (
      <div className="App-header">
        <h1 className="">
          Iniciar sesión
        </h1>
        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor="userEmail">Email</label>
            <input type="text" name="userEmail" id="userEmail" />
          </div>
          <div>
            <label htmlFor="userPassword">Password</label>
            <input type="password" name="userPassword" id="userPassword" />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="errorHandling">
          {this.state.errorMessage}
        </p>
      </div>
    );
  }
}

export default App;