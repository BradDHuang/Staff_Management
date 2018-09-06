
import React, {Component} from "react";
import { Container, ListGroup, ListGroupItem} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

// const List = props => {
//   return (
//     <li className="list">
      
//       <div className="li-mid">
//         <Link to={`/detail/${props.data._id}`}>
//           <div className="li-name">
//             {props.data.fullName}
//           </div>
//         </Link>
//         <div className="li-title">{props.data.title}</div>
//       </div>
//       <div className="li-reports">{props.data.directReports.length}</div>
//       <Link to={`/detail/${props.data._id}`}>
//         <i className="fas fa-angle-right" id="li-arrow" />
//       </Link>
//     </li>
//   );
// };

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.getStaff();
    }
    onDetailClick = (id) => {
        console.log(`you opened staff detail page with id: ${id}.`);
    }
    render() {
        const { staff } = this.props.staff;
        return (
            <Container>
                <h1>Staff Directory</h1>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {staff.map(({ _id, fullName, title, directReports }) => (
                            <CSSTransition key={_id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    <Link to={`/api/staff/${_id}`}>
                                        {fullName}{" | "}
                                    </Link>
                                    {title}{" | "}
                                    {directReports.length}{" "}
                                    <Link to={`/api/staff/${_id}`}>
                                        <i onClick={() => this.onDetailClick(_id)} 
                                            style={{color: "deepskyblue"}} 
                                            className="fas fa-chevron-right">
                                        </i>
                                    </Link>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    staff: state.staff,
});

export default connect(mapStateToProps, { getStaff })(StaffList);




