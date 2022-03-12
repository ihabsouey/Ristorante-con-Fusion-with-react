import React, { Component } from "react";
import {
    Navbar, Nav, NavItem, Button, Modal, ModalBody,
    Form, FormGroup,
} from 'react-bootstrap';

import { NavLink ,Link} from "react-router-dom";
import { imgUrl } from "../shared/baseUrl";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
        toggleModal() {

            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }
    render() {
        return (
            <React.Fragment >
                <Navbar className="navbar-dark" expand="md">
                    <div className="container">
                        <Navbar.Toggle />
                           <NavLink className="nav-link" to="Ristorante-con-Fusion-with-react/home/">
                           <Navbar.Brand ><img src={imgUrl + "/images/logo.png"} height="30" width="40" alt="logo" /></Navbar.Brand>
                   
                                    </NavLink>
                        <Navbar.Collapse className=" " >
                            <Nav className="me-auto">
                                <NavItem>
                                    <NavLink className="nav-link" to="Ristorante-con-Fusion-with-react/home/">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="Ristorante-con-Fusion-with-react/aboutus/">
                                        <span className="fa fa-info fa-lg"></span> About us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="Ristorante-con-Fusion-with-react/menu">
                                        <span className="fa fa-bars fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="Ristorante-con-Fusion-with-react/contactus">
                                        <span className="fa fa-address-card fa-lg ml-5"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav>
                                <NavItem>
                                    <Button onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg "></span> Login</Button>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>

                <div className="Jumbotron mb-3">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1> Risotorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>

                            </div>

                        </div>
                    </div>

                </div>
                <Modal show={this.state.isModalOpen} >
                    <Modal.Header className="bg-primary" closeButton onClick={this.toggleModal}>
                        <Modal.Title>Login</Modal.Title>

                    </Modal.Header>

                    <ModalBody>

                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Form.Label>Username </Form.Label>
                                <Form.Control type="text" id="username" name="username"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Password </Form.Label>
                                <Form.Control type="password" id="password" name="password"
                                />
                            </FormGroup>

                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" name="remember"
                                    label="  Remember me" />
                            </Form.Group>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>


                    </ModalBody>
                </Modal>

            </React.Fragment>
        )
    }
}
export default Header;
