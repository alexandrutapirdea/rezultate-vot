import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Container} from 'reactstrap';
import {Form, FormGroup, Label, Input, FormFeedback, FormText,ButtonToggle,Alert} from 'reactstrap';
// import { Link } from 'react-router-dom';
import votLogo from '../../images/rezultateVot.png';
import './AdminLoginPage.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from "../../utils/validators";
import { withRouter } from 'react-router-dom'


export class AdminLoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
        };
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    loginHandler = () => {


        let errors = this.validateLoginForm();
        if(errors === true){
            console.log("login cu success");
            localStorage.setItem("authToken","123");
            this.props.history.push('/web/admin-panel');
            this.setState({
                errors: {},
            });
        } else {
            this.setState({
                errors: errors,
            });
        }
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    };

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.loginHandler();
        }
    };

    componentDidMount() {
        if(  localStorage.getItem("authToken")){
            this.props.history.push('/web/admin-panel');
        }
    }

    render() {
        // js code
        const {errors} = this.state;
        return (
            <div>
                <h1 className="title center">Log in</h1>
                <div className="login-container">
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="your-email@gmail.com"
                            onChange={this.handleInputChange}
                            onKeyPress={this.keyPressed}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="your password"
                            onChange={this.handleInputChange}
                            onKeyPress={this.keyPressed}
                        />
                    </FormGroup>
                    { (errors.email || errors.password) && <Alert color="danger">
                        <p>{errors.password || ""}</p>
                        <p>{errors.email || ""}</p>
                    </Alert>}
                    <ButtonToggle color="primary center custom-button" onClick={this.loginHandler}>Log in</ButtonToggle>{' '}
                </div>
            </div>
        );
    }
}

export default withRouter(AdminLoginPage);
