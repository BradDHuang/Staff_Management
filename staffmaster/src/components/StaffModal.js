
import React, {Component} from "react";
import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody,
    Input, 
    Label, 
    Form, 
    FormGroup
} from "reactstrap";
import {connect} from "react-redux";
import {addStaff} from "../actions/staffActions";

class StaffModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: "",
        };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    onChange = (e) => {
        // console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newMember = {
            name: this.state.name,
        };
        console.log(newMember);
        this.props.addStaff(newMember);
        // close the modal
        this.toggle();
    }
    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: "2rem"}}
                    onClick={this.toggle}
                >
                Add Member
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                    Add to Staff List
                    </ModalHeader>
                    <ModalBody>
                        <Form
                            onSubmit={this.onSubmit}
                        >
                            <FormGroup>
                                <Label for="member">Member
                                </Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="member"
                                    placeholder="Add staff member"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: "2rem"}}
                                    block
                                >
                                Add Member
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    staff: state.staff,
});

export default connect(mapStateToProps, {addStaff})(StaffModal);






