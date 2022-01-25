import React, { Component } from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

import { Route, Routes, useParams } from 'react-router-dom'
 
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }
    const DishWithId = () => {
      const { dishId } = useParams();

      return (

        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(dishId))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(dishId))} />
      )
    }
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route exact path="/aboutus" element={<About leaders={this.props.leaders} />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);