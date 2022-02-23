import React, { Component } from 'react';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { postComment, postFeedBack, fetchComments, fetchDishes, fetchPromos , fetchLeader} from '../redux/ActionCreators';

import { Route, Routes, useParams } from 'react-router-dom'

import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeader : () => {dispatch(fetchLeader())},
  postFeedBack: (feedback) => dispatch(postFeedBack(feedback))


});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeader  ();
  }


  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      )
    }
    const DishWithId = () => {
      const { dishId } = useParams();

      return (

        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId))[0]}
          isLoading={this.props.dishes.isLoading}
          ErrMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          postFeedBack={this.props.postFeedBack} />
      )
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition  classNames="page" timeout={300}>
              <Routes location={this.props.dishId}>
                 
              <Route path="/home" element={<HomePage />} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" element={<DishWithId />} />
              <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedBack={this.props.postFeedBack} />} />
              <Route exact path="/aboutus" element={<About leaders={this.props.leaders} />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);