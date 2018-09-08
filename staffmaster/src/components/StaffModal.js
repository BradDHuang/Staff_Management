
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
            fullName: "",
            title: "",
            sex: "",
            // avatar: "",
            manager: "",
            // directReports: [String],
            officePhone: null,
            cellPhone: null,
            email: "",
            errMsg: false,
        };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    onChange = (e) => {
        // console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errMsg: false });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newMember = {
            fullName: this.state.fullName,
            title: this.state.title,
            sex: this.state.sex,
            manager: this.state.manager,
            officePhone: this.state.officePhone,
            cellPhone: this.state.cellPhone,
            email: this.state.email
        };
        if (this.state.fullName) {
            console.log(newMember);
            this.props.addStaff(newMember);
            // close the modal
            this.toggle();
        } else {
            // alert("Full Name is required.");
            this.setState({ errMsg: true });
        }
    }
    render() {
        // const { staff } = this.props.staff;
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
                                <Label for="fn">Full Name
                                </Label>
                                {this.state.errMsg &&
                                    <div style={{ color: "red" }}>
                                        {" *Full Name is required.*"}
                                    </div>
                                }
                                <Input 
                                    type="text"
                                    name="fullName"
                                    id="fn"
                                    placeholder="Add Full Name"
                                    onChange={this.onChange}
                                />
                                <Label for="title">Title
                                </Label>
                                <Input 
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Add Staff Title"
                                    onChange={this.onChange}
                                />
                                <br />
                                <Label for="sex">Sex
                                </Label>
                                {" "}
                                <select 
                                    type="text"
                                    name="sex"
                                    id="sex"
                                    onChange={this.onChange}
                                >
                                    <option value={null}></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <br />
                                <Label for="op">Office Phone
                                </Label>
                                <Input 
                                    type="text"
                                    name="officePhone"
                                    id="op"
                                    placeholder="Add Office Phone"
                                    onChange={this.onChange}
                                />
                                <Label for="cp">Cell phone
                                </Label>
                                <Input 
                                    type="text"
                                    name="cellPhone"
                                    id="cp"
                                    placeholder="Add Cell Phone"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email
                                </Label>
                                <Input 
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Add Staff Email"
                                    onChange={this.onChange}
                                />
                                <br />
                                <Label for="manager">Manager
                                </Label>
                                {" "}
                                <select
                                    type="text"
                                    name="manager"
                                    id="manager"
                                    onChange={this.onChange}
                                >
                                    <option value={null}>None</option>
                                    {
                                        this.props.staff.staff.map((manager, index) => {
                                            return <option key={index} value={manager._id}>{manager.fullName}</option>;
                                        })
                                    }
                                </select>
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






