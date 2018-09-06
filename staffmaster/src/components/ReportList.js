
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
        <Link to={`/api/staff/${props.data._id}`}>
          <div>{props.data.fullName}</div>
        </Link>
        <div>{props.data.title}</div>
      </div>
      <Link to={`/api/staff/${props.data._id}`}>
        <div>{props.data.directReports.length}</div>
        <i className="fas fa-angle-right" />
      </Link>
    </FormGroup>
    </Form>
  );
};

class ReportList extends Component {
    
  render() {
    return (
      <div>
        <Link to={`/api/staff/${this.props.detail.detail._id}`}>
          <i className="fas fa-angle-left" />
        </Link>
        {"Direct Report"}
        <div>
            {this.props.detail.directReports.map(dr => {
              return <List data={dr} key={dr.id} />;
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



