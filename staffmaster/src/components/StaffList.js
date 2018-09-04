
import React, {Component} from "react";
import { Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStaff, deleteStaff } from "../actions/staffActions";

class StaffList extends Component {
    
    componentDidMount() {
        this.props.getStaff();
    }
    onDeleteClick = (id) => {
        this.props.deleteStaff(id);
    }
    render() {
        const { members } = this.props.staff;
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {members.map(({ _id, fullName }) => (
                            <CSSTransition key={_id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => this.onDeleteClick(_id)}
                                    >&times;
                                    </Button>
                                    {fullName}
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

export default connect(mapStateToProps, { getStaff, deleteStaff })(StaffList);




