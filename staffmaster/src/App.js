import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import store from "./store";
import {Container} from "reactstrap";
import StaffList from "./components/StaffList";
import StaffModal from "./components/StaffModal";
import AppNavbar from "./components/AppNavbar";
import DetailPage from "./components/DetailPage";
import ReportList from "./components/ReportList";
import EditPage from "./components/EditPage";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <AppNavbar />
          <Container>
            <StaffModal />
            <Route path="/" exact={true} component={StaffList} />
            <Route path="/api/staff/:id" component={DetailPage} />
            <Route path="/directReportsList" component={ReportList} />
            <Route path="/edit" component={EditPage} />
          </Container>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
