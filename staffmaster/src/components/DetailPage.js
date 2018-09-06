
import React, {Component} from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getStaffDetail, deleteStaff } from "../actions/staffActions";

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
                    Staff
                    <br />
                    <Link to="/">
                        <button type="button" className="btn">Back</button>
                    </Link>
                    {" "}
                    <Link to="/edit">
                    <button type="button" className="btn btn-info">Edit</button>
                    </Link>
                    {" "}
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this.onDeleteClick}
                    >
                        Delete
                    </button>
                </div>
                <ul className="list-wrap list-detail">
                    <li>
                    
                        <div className="li-name">{this.props.detail.detail.fullName}</div>
                        <div className="li-title">{this.props.detail.detail.title}</div>
                    </li>
                    <Link to={
                      this.props.detail.manager
                        ? `/detail/${this.props.detail.detail.manager}`
                        : `${this.props.url}`
                    }>
                        <li>
                          <h4>View Manager</h4>
                          <div>
                            {this.props.detail.manager
                              ? `${this.props.detail.manager.fullName}`
                              : "None"}
                          </div>
                        </li>
                    </Link>
                    <Link to={
                      this.props.detail.directReports.length > 0
                        ? "/report"
                        : `${this.props.url}`
                    }>
                        <li>
                          <h4>View Direct Reports</h4>
                          <div>{this.props.detail.directReports.length}</div>
                        </li>
                    </Link>
                    <li>
                        <h4>Call Office</h4>
                        <div>
                          {this.props.detail.detail.officePhone
                            ? this.props.detail.detail.officePhone
                            : "N/A"}
                          <a href={`tel: ${this.props.detail.detail.officePhone}`}>
                            <i className="fas fa-phone" />
                          </a>
                        </div>
                    </li>
                    <li>
                        <h4>Call Cell</h4>
                        <div>
                          {this.props.detail.detail.cellPhone
                            ? this.props.detail.detail.cellPhone
                            : "N/A"}
                          <a href={`tel: ${this.props.detail.detail.cellPhone}`}>
                            <i className="fas fa-mobile"></i>
                          </a>
                        </div>
                    </li>
                    <li>
                        <h4>Email</h4>
                        <div>
                          {this.props.detail.detail.email}{" "}
                          <a href={`mail to: ${this.props.detail.detail.email}`}>
                            <i className="far fa-envelope-open" />
                          </a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   detail: state.detail, 
});

export default connect(mapStateToProps, { getStaffDetail, deleteStaff })(DetailPage);


