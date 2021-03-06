import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent';
import {imgUrl} from '../shared/baseUrl'

function RenderMenuItem({ dish }) {
  return (
    <Card id={dish.id}>
      <Link to={`/Ristorante-con-Fusion-with-react/menu/${dish.id}`}>
        <Card.Img width="100%" src={imgUrl+ dish.image } alt={dish.name} />
        <Card.ImgOverlay >
          <Card.Title>{dish.name}</Card.Title>
        </Card.ImgOverlay>
      </Link>
    </Card>
  )
}
const Menu = (props) => {

  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });
  if (props.dishes.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    )
  }
  else if (props.dishes.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.dishes.errMess} </h4>
        </div>
      </div>
    )
  }
  else
    return (
      <div className="container">
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem><Link to='/Ristorante-con-Fusion-with-react/home' >Home </Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu </BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Menu</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          {menu}
        </div>
      </div>
    );
}




export default Menu;