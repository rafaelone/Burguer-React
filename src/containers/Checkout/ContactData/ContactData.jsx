import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../Axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import './ContactData.css';
import Auxi from '../../../hoc/Auxi';

class ContactData extends Component {
  state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: ''
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: ''
        },
        deliveryMethod : {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ],
          },
          value: ''
        }
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm})
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <Auxi>
        <form>
          {formElementsArray.map(formElement => (
            <Input 
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
            />
          ))}
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
