import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';

class ContactData extends Component {
  state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
    };

  render() {
    return (
      <div className="contactData">
        <h4>Enter your Contact Data</h4>
        <form>
          <input className="input" type="text" name="name" id="name" placeholder="Your Name" />
          <input className="input" type="email" name="email" id="email" placeholder="Your Email" />
          <input className="input" type="text" name="street" id="street" placeholder="Your Street" />
          <input className="input" type="text" name="postal" id="postal" placeholder="Your Postal Code" />
        </form>
        <Button btnType="success">ORDER</Button>
      </div>
    );
  }
}

export default ContactData;
