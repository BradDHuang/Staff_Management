import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import store from "./store";
import {Container} from "reactstrap";
import StaffList from "./components/StaffList";
import StaffModal from "./components/StaffModal";
import AppNavbar from "./components/AppNavbar";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <AppNavbar />
        <Container>
          <StaffModal />
          <StaffList />
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
