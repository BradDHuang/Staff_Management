
import React, {Component} from "react";
import { Container, ListGroup, ListGroupItem, Input, } from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStaff } from "../actions/staffActions";
import { Link } from "react-router-dom";
// import InfiniteScroller from "react-infinite-scroller";
// import * as actions from "../actions/staffActions";
// import { ClipLoader } from "react-spinners";

// const Loading = props => {
//   return (
//     <div className="loading">
//       <ClipLoader loading={true} size={150} color={"#123abc"}/> 
//     </div>
//   );
// };

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
                    style={{ color: "deepskyblue" }}
                >
                    <span style={{ fontSize: "75%" }}>
                        {props.data.directReports.length}{" "}
                    </span>
                    <span>
                    <i onClick={() => props.onDetailClick(props.data._id)} 
                        className="fas fa-chevron-right">
                    </i>
                    </span>
                </Link>
            </div>
        </ListGroupItem>
    );
};

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = { search: "" };
    }
    componentDidMount() {
        this.props.getStaff();
    }
    onDetailClick = (id) => {
        console.log(`you opened staff detail page with id: ${id}.`);
    }
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }
    matchSearch = (m) => {
        return (
            m.fullName.search(new RegExp(this.state.search)) !== -1 ||
            m.title.search(new RegExp(this.state.search)) !== -1 
            // m.sex.search(new RegExp(this.state.search)) !== -1 ||
            // m.email.search(new RegExp(this.state.search)) !== -1
        );
    }
    render() {
        const { staff } = this.props.staff;
        return (
            <Container>
                <h1>Staff Directory</h1>
                <hr />
                    <div style={{ width: "400px" }}>
                        <Input type="text" value={this.state.search} 
                            onChange={this.handleSearch}
                            id="search"
                            placeholder="search..."
                        />
                    </div>
                <hr />
                <ListGroup>
                        {staff.map((member, index) => {
                            
                            if (this.state.search === "") {
                                return <List key={index} data={member} 
                                        onDetailClick={this.onDetailClick}
                                       />;
                            } else {
                                return (this.matchSearch(member)) ?
                                    <List key={index} data={member} 
                                        onDetailClick={this.onDetailClick}
                                    />
                                    : null;
                            }
                        })}
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    staff: state.staff,
});

export default connect(mapStateToProps, { getStaff })(StaffList);




