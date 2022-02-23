import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {
    Modal, ModalBody, Button,
    Form, FormGroup
} from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModal2Open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleSubmit(values) {

        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal() {


        this.setState({
            isModal2Open: !this.state.isModal2Open
        });

    }
    render() {

        return (
            <div>
                <button className='btn  border' onClick={this.toggleModal}> <i className='fa fa-edit'></i> Submit comment</button>

                <Modal show={this.state.isModal2Open} >
                    <Modal.Header className="bg-primary" closeButton onClick={this.toggleModal}>
                        <Modal.Title>Submit Comment</Modal.Title>

                    </Modal.Header>

                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <FormGroup >
                                <Form.Label>Rating </Form.Label>
                                <Control.select model=".rating"
                                    className='form-control'>
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>

                            </FormGroup>
                            <FormGroup className="mb-2 mt-2">
                                <Form.Label>Your name </Form.Label>
                                <Control.text model=".author" id="name" name="author"
                                    className='form-control'
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </FormGroup>

                            <Form.Group className="mb-4">
                                <Form.Label>Comment </Form.Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Form.Group>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>


                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

function RenderDish({ dish }) {
    if (dish) {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card key={dish.id} className="">
                    <Card.Img width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <Card.Body>
                        <Card.Title>{dish.name}</Card.Title>
                        <Card.Text>{dish.description} </Card.Text>
                    </Card.Body>
                </Card>
            </FadeTransform>

        )
    }
    else {
        return (
            <div>

            </div>)
    }
}

function RenderComment({ comm, postComment, dishId }) {


    if (comm) {
        return (

            <div  >
                <h3>Comments</h3>
                <Stagger in>
                    {
                        comm.map((co) => [
                            <Fade in>
                                <div key={co.id}>
                                    <p>{co.comment}</p>
                                    <p>--{co.author} , {new Date(co.date).toDateString()}</p>
                                </div>
                            </Fade>

                        ])
                    }
                </Stagger>

                <CommentForm dishId={dishId} postComment={postComment} />
            </div>

        )
    }
    else {
        return (<div> </div>)
    }
}


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess} </h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu' >Menu </Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <div className="row">
                    <div className='col-12 col-md-5  m-1' >
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5  m-1' >
                        <RenderComment comm={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div>



        );
    else return (
        <div className='m-5 center '>
            <center><h1>Dish Not found</h1> </center>
        </div>
    )
}
export default DishDetail
