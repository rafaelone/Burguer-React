import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../Axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import './ContactData.css';
import Auxi from '../../../hoc/Auxi';

class ContactData extends Component {
  state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false
    };

  orderHandler = event => {
    event.preventDefault();
    const { ingredients } = this.props;
    this.setState({ loading: true })
    const order = {
      Ingredients: ingredients,
      price: this.props.price,
      customer: {
        name: 'Rafael',
        address: {
          street: 'TestStreet 1',
          zipCode: '31231',
          country: 'Brazil'
        },
        email: 'teste@teste.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false })
        console.log(this.props)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false })
      })



  }

  render() {
    let form = (
      <Auxi>
        <form>
          <Input inputtype="input" type="text" name="name" id="name" placeholder="Your Name" />
          <Input inputtype="input" type="email" name="email" id="email" placeholder="Your Email" />
          <Input inputtype="input" type="text" name="street" id="street" placeholder="Your Street" />
          <Input inputtype="input" type="text" name="postal" id="postal" placeholder="Your Postal Code" />
        </form>
        <Button btnType="success" clicked={this.orderHandler}>ORDER</Button>
      </Auxi>
    );

    if(this.state.loading){
      form = <Spinner />
    }
    return (
      <div className="contactData">
        <h4>Enter your Contact Data</h4>
        {form}
    </div>
    );
  }
}

export default ContactData;
