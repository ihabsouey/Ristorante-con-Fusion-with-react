import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Breadcrumb , BreadcrumbItem} from 'reactstrap'
import {
    Modal, ModalBody, Button,
    Form, FormGroup
} from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
 
const maxLength = (len) => (val) => !(val) || (val.length <= len) ;
const minLength = (len) => (val) => val && (val.length >= len ) ;
 

class CommentForm extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isModal2Open: false
        };

        this.toggleModal = this.toggleModal.bind(this);
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

                        <LocalForm >
                            <FormGroup >
                                <Form.Label>Rating </Form.Label>
                                <Form.Select >

                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>

                            </FormGroup>
                            <FormGroup  className="mb-2 mt-2">
                                <Form.Label>Your name </Form.Label>
                                <Control.text model=".name" id="name" name="name"
                                className='form-control'
                                       validators={{
                                         minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                 <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </FormGroup>

                            <Form.Group className="mb-4">
                            <Form.Label>Comment </Form.Label> 
                                <Form.Control as="textarea" rows={6} /> 
                            </Form.Group>
                            <Button onClick={this.toggleModal} type="submit" value="submit" color="primary">Login</Button>
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
           
                    <Card key={dish.id} className="">
                        <Card.Img width="100%" src={dish.image} alt={dish.name} />
                        <Card.Body>
                            <Card.Title>{dish.name}</Card.Title>
                            <Card.Text>{dish.description} </Card.Text>
                        </Card.Body>
                    </Card>
             
        )
    }
    else { return (
            <div>
                
            </div>)
    }
}

function RenderComment({comm}) {
    

    if (comm) {
        return(
           
                <div  >
                  <h3>Comments</h3>
                   {
                       comm.map((co)=>[
                           <div key={co.id}>
                                <p>{co.comment}</p>
                                 <p>--{co.author} , {new Date(co.date).toDateString()}</p>
                            </div>
                       ])
                   }
                   <CommentForm />
                </div>
          
        )
    }
    else{
        return (<div> </div>)
    }
}


const DishDetail = (props) => {
    
    if(props.dish != null)
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
                        <RenderComment comm={props.comments} />
                    </div>
                </div>
        </div>
    


    );
    else return(
        <div className='m-5 center '> 
                   <center><h1>Dish Not found</h1> </center> 
        </div>
    )
}
export default DishDetail
