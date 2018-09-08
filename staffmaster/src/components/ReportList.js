
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Container, 
    ListGroup, 
    ListGroupItem
} from "reactstrap";

const List = props => {
  return (
    <ListGroupItem style={{ display: "flex", width: "400px" }}>
      <div style={{ flex: "50%" }}>
        <Link to={`/api/staff/${props.data._id}`}
          style={{fontWeight: "bold", color: "deepskyblue"}}
        >
          {props.data.fullName}
        </Link>
        <div>
          {props.data.title}
        </div>
      </div>
      <div style={{ fontSize: "200%" }}>
        <Link to={`/api/staff/${props.data._id}`}
          style={{color: "deepskyblue"}}
        >
          <span style={{ fontSize: "75%" }}>
            {props.data.directReports.length}{" "}
          </span>
          <span>
            <i className="fas fa-angle-right" />
          </span>
        </Link>
      </div>
    </ListGroupItem>
  );
};

class ReportList extends Component {
    
  render() {
    return (
      <Container>
        <h2>
        <Link to={`/api/staff/${this.props.detail.detail._id}`}
          style={{color: "black"}}
        >
          <i className="fas fa-angle-left" />
        </Link>
        {" "}{"Direct Report"}
        </h2>
        <ListGroup>
            {this.props.detail.directReports.map((dr, index) => {
              return <List data={dr} key={index} />;
            })}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    detail: state.detail
});

export default connect(mapStateToProps)(ReportList);



