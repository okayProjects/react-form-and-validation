import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    username: '',
    useremail: '',
    password: '',
    accept: false,
    formSentMessage: '',
    errors: {
      username: false,
      useremail: false,
      password: false,
      accept: false
    }
  }

  messages = {
    username: 'Nazwa musi zawierać minimum 10 znaków',
    useremail: 'Email musi zawierać @',
    password: 'Nie może być krótszy niż 8 znaków',
    accept: 'Potwierdź akceptację warunków'
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.formSentMessage !== '') {
        this.setState(prevState => {
          return { formSentMessage: prevState.formSentMessage = '' };
        });
      }
    }, 2000);
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    if (type === 'text' || type === 'password' || type === 'email') {
      this.setState(prevState => {
        return { [name]: prevState[name] = value };
      });
    } else if (type === 'checkbox') {
      this.setState(prevState => {
        return { accept: !prevState.accept };
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const validation = this.validation();

    if (validation.formCorrect) {
      this.setState(
        {
          username: '',
          useremail: '',
          password: '',
          accept: false,
          formSentMessage: 'Dziękujemy za wysłanie formularza',
          errors: {
            username: false,
            useremail: false,
            password: false,
            accept: false
          }
        }
      )
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          useremail: !validation.useremail,
          password: !validation.password,
          accept: !validation.accept
        }
      })
    }
  }

  validation = () => {
    let useremail = false;
    let username = false;
    let accept = false;
    let password = false;
    let formCorrect = false;

    if (this.state.username.length >= 10 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }
    if (this.state.useremail.indexOf('@') !== -1) {
      useremail = true;
    }
    if (this.state.password.length >= 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && password && accept && useremail) {
      formCorrect = true;
    }
    return ({
      username,
      accept,
      password,
      useremail,
      formCorrect
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitHandler} noValidate>
          <label>Twoje imię
            <input type='text' name='username' value={this.state.username} onChange={this.changeHandler}></input>{this.state.errors.username && <span>{this.messages.username}</span>}
          </label>


          <label>Twój email
            <input type='email' name='useremail' value={this.state.useremail} onChange={this.changeHandler}></input>{this.state.errors.useremail && <span>{this.messages.useremail}</span>}
          </label>

          <label>Twoje hasło
            <input type='password' name='password' value={this.state.password} onChange={this.changeHandler}></input>{this.state.errors.password && <span>{this.messages.password}</span>}
          </label>

          <label>
            <input type='checkbox' name='accept' checked={this.state.accept} onChange={this.changeHandler}></input>Zgodę wyrażam wszelaką

          </label>
          {this.state.errors.accept && <span>{this.messages.accept}</span>}
          <button>Zapisz się</button>
        </form>
        {this.state.formSentMessage && <h4>{this.state.formSentMessage}</h4>}
      </div>
    );
  }
}

export default App;
