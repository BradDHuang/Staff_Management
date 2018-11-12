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
  
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Text text={"A string"} />
        <h1>{this.state.number}</h1>
        <button onClick={this.double}>Double</button>
      </div>
    );
  }
}

export default App;
