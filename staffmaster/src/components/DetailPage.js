
import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getStaffDetail, deleteStaff } from "../actions/staffActions";
import {
    Button,
    Form, 
    FormGroup
} from "reactstrap";

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }
    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.props.getStaffDetail(this.props.match.params.id);
    }
    onDeleteClick = () => {
        const {detail} = this.props.detail;
        console.log(detail);
        this.props.deleteStaff(detail._id);
        this.setState({ redirect: true });
    }
    render() {
        console.log(this.props.detail);
        return this.state.redirect ? (<Redirect to={{ pathname: "/" }} />) : 
            !this.props.detail.detail ? null :    
        (
            <div>
                <div>
                    <h4>Staff Detail:</h4>
                    
                    <Link to="/">
                        <Button type="button" className="btn">Back</Button>
                    </Link>
                    {" "}
                    <Link to="/edit">
                        <Button type="button" className="btn btn-info">Edit</Button>
                    </Link>
                    {" "}
                    <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDeleteClick}
                    >
                        Delete
                    </Button>
                </div>
                <Form>
                <FormGroup>
                    <hr />
                    <div className="li-name">{this.props.detail.detail.fullName}</div>
                    <div className="li-title">{this.props.detail.detail.title}</div>
                    <hr />
                    <Link to={
                      this.props.detail.manager
                        ? `/detail/${this.props.detail.detail.manager}`
                        : `${this.props.match.url}`
                      }
                      style={{color: "deepskyblue"}}
                    >
                        {"View Manager"}
                    </Link>
                    <div>
                      {this.props.detail.manager
                        ? `${this.props.detail.manager.fullName}`
                        : "None"}
                    </div>
                    <hr />
                    <Link to={
                      this.props.detail.directReports.length > 0
                        ? "/report"
                        : `${this.props.match.url}`
                      }
                      style={{color: "deepskyblue"}}
                    >
                        {"View Direct Reports"}
                    </Link>
                    <div>{this.props.detail.directReports.length}</div>
                    <hr />
                    <div style={{color: "deepskyblue"}}>
                        {"Call Office"}
                    </div>
                    <div>
                        <i className="fas fa-phone" />
                        {" "}{this.props.detail.detail.officePhone
                          ? this.props.detail.detail.officePhone
                          : "N/A"}
                    </div>
                    <hr />
                    <div style={{color: "deepskyblue"}}>
                        {"Call Cell"}
                    </div>
                    <div>
                        <i className="fas fa-mobile"></i>
                        {" "}{this.props.detail.detail.cellPhone
                          ? this.props.detail.detail.cellPhone
                          : "N/A"}
                    </div>
                    <hr />
                    <div style={{color: "deepskyblue"}}>
                        {"Email"}
                    </div>
                    <div>
                        <i className="far fa-envelope-open" />
                        {" "}{this.props.detail.detail.email
                          ? this.props.detail.detail.email
                          : "N/A"}
                    </div>
                    <hr />
                </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   detail: state.detail, 
});

export default connect(mapStateToProps, { getStaffDetail, deleteStaff })(DetailPage);


