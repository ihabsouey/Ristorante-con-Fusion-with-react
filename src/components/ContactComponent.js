import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Label, Col, Row
} from 'reactstrap';
import { Control, Form, Errors  } from 'react-redux-form';

import { Link } from 'react-router-dom' 


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {


    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
       // this.props.postFeedBack(values);
        alert('Thank you for your feedback ' + JSON.stringify(values.firstname))
        
        this.props.resetFeedbackForm();

    }


    render() {

        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/Ristorante-con-Fusion-with-react/home">Home</Link></BreadcrumbItem>

                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                        <iframe title='maplocation' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.5237816504946!2d114.21604661451245!3d22.3338431853062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340406b77660041b%3A0x1e1faa9bb38e36f3!2s121%20Clear%20Water%20Bay%20Rd%2C%20Ngau%20Chi%20Wan%2C%20Hong%20Kong!5e0!3m2!1sfr!2stn!4v1646677778066!5m2!1sfr!2stn" height="120%"  allowFullScreen="" loading="lazy"></iframe>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1 mt-4">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href='skype.com'><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>


                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form  model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group mt-2">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                  
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className='form-control'

                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                       <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />

                                </Col>
                            </Row>
                            <Row className="form-group mt-2 ">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                      <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />

                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                     <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 numbers ',
                                            maxLength: 'Must be 15 numbers or less ',
                                            isNumber: 'Must be a number '
                                        }}
                                     />

                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className='form-control'
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                          <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />

                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className='form-check-input' /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType"
                                        className='form-control'>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className='form-control'
                                    ></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>


            </div>
        );
    }
}
export default Contact;