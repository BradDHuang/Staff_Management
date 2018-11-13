import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import PropTypes from "prop-types";

class Text extends Component {
  render() {
    // console.log(this.props);
    return (
      <p>
        {this.props.text}
      </p>
    );
  }
}

Text.propTypes = {
  text: PropTypes.string
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
  }
  
  double = () => {
    this.setState({ number: this.state.number * 2 });
  }
  
  showAlert = () => {
    console.log(this); // App {...}
    alert("this is an alert!");
  }
  
  inputChange = e => {
    // console.log(e); // Event
    // console.log(e.target); // <input>
    console.log(e.target.value);
    // console.log(typeof e.target.value); // string
  }
  
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Text text={"A string"} />
        <h1>{this.state.number}</h1>
        <button onClick={this.double}>Double</button>
        <button onClick={this.showAlert}>Show Alert</button> 
        <input onChange={this.inputChange} />
      </div>
    );
  }
}

export default App;
