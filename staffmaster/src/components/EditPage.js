
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../actions/staffActions";
import {
    Button,
    Form, 
    FormGroup,
    Label,
    Input
} from "reactstrap";

const findInvalidManagers = (members, memberID) => {
  let map = new Map();
  members.forEach(member => {
    map.set(member._id, member);
  });
  let invalids = [];
  lookUp(memberID, invalids, map);
  return invalids;
};
const lookUp = (memberID, invalids, map) => {
  if (!map.has(memberID)) {
    return;
  }
  invalids.push(memberID);
  let member = map.get(memberID);
  for (let dr of member.directReports) {
    lookUp(dr, invalids, map);
  }
  return;
};

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      fullName: "",
      title: "",
      sex: "",
      email: "",
      officePhone: "",
      cellPhone: "",
      manager: "",
      redirect: false,
      invalid: [],
    };
  }

  componentDidMount() {
    console.log(this.props.detail.detail);
    this.setState({
      _id: this.props.detail.detail._id,
      fullName: this.props.detail.detail.fullName,
      title: this.props.detail.detail.title,
      sex: this.props.detail.detail.sex,
      email: this.props.detail.detail.email,
      officePhone: this.props.detail.detail.officePhone,
      cellPhone: this.props.detail.detail.cellPhone,
      manager: this.props.detail.detail.manager
    });
    this.props.dispatch(actions.getStaff());
    this.setState({
      invalid: findInvalidManagers(this.props.staff.staff, this.props.detail.detail._id)
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    let member = {
      _id: this.state._id,
      fullName: this.state.fullName,
      title: this.state.title,
      sex: this.state.sex,
      email: this.state.email,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      manager: this.state.manager,
    };
    console.log(this.state._id, member);
    this.props.dispatch(actions.editStaff(this.state._id, member));
    this.setState({redirect: true});
  };

  render() {
    return this.state.redirect ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <div>
        <h3>Edit Page</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
          
            <Label for="fullName">Full Name:</Label>
            <Input
              type="text"
              id="fullName"
              onChange={this.onChange}
              name="fullName"
              placeholder="Full Name"
              value={this.state.fullName}
            />
          
            <Label for="title">Title:</Label>
            <Input
              type="text"
              id="title"
              onChange={this.onChange}
              name="title"
              placeholder="Title"
              value={this.state.title}
            />
            <br />
            <Label for="sex">Sex:</Label>{" "}
            <select
              id="sex"
              onChange={this.onChange}
              name="sex"
              value={this.state.sex}
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <br />
            <Label for="officePhone">Office Phone:</Label>
            <Input
              type="text"
              id="officePhone"
              placeholder="Office Phone"
              onChange={this.onChange}
              name="officePhone"
              value={this.state.officePhone}
            />
          
            <Label for="cellPhone">Cell Phone:</Label>
            <Input
              type="text"
              id="cellPhone"
              placeholder="Cell Phone"
              onChange={this.onChange}
              name="cellPhone"
              value={this.state.cellPhone}
            />
         
            <Label for="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              onChange={this.onChange}
              name="email"
              value={this.state.email}
            />
            <br />
            <Label for="manager">Manager:</Label>{" "}
            <select
              id="manager"
              onChange={this.onChange}
              name="manager"
              value={this.state.manager}
            >
              <option value="">None</option>
              {this.props.staff.staff ? this.props.staff.staff.map((manager, index) => {
                if (manager._id !== this.props.detail.detail._id) {
                  if (this.state.invalid.includes(manager._id)) {
                    return (
                      <option key={index} value={manager._id} disabled>
                        {manager.fullName}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={manager._id}>
                        {manager.fullName}
                      </option>
                    );
                  }
                } else {
                    return (
                      <option key={index} value={manager._id} disabled>
                        {manager.fullName}
                      </option>
                    );
                }
              }) : null}
            </select>
            <br />
          <Link to="/">
            <Button type="submit" className="btn">
              Cancel
            </Button>
          </Link>{" "}
          <Button type="submit" className="btn btn-success">
            Save Changes
          </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    staff: state.staff,
    detail: state.detail,
});

export default connect(mapStateToProps)(EditPage);

