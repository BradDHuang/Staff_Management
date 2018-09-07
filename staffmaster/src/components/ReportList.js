
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Form, 
    FormGroup
} from "reactstrap";

const List = props => {
  return (
    <Form>
    <FormGroup>
      <div>
        <hr />
        <Link to={`/api/staff/${props.data._id}`}>
          {props.data.fullName}
        </Link>
        {" | "}{props.data.title}{" | "}
        
        <Link to={`/api/staff/${props.data._id}`}>
          {props.data.directReports.length}{" "}
            <i className="fas fa-angle-right" />
          
        </Link>
      </div>
    </FormGroup>
    </Form>
  );
};

class ReportList extends Component {
    
  render() {
    return (
      <div>
        <h3>
        <Link to={`/api/staff/${this.props.detail.detail._id}`}>
          <i className="fas fa-angle-left" />
        </Link>
        {" "}{"Direct Report"}
        </h3>
        <div>
            {this.props.detail.directReports.map((dr, index) => {
              return <List data={dr} key={index} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    detail: state.detail
});

export default connect(mapStateToProps)(ReportList);



