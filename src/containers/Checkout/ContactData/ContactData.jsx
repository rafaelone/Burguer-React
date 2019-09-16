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
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod : {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ],
          },
          value: '',
          validation: {},
          valid: true
        }
      },
      formIsValid: false,
      loading: false
    };

  orderHandler = event => {
    console.log("qual é")
    event.preventDefault();
    const { ingredients } = this.props;
    this.setState({ loading: true })
    const formData = {}
    for (let  formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      Ingredients: ingredients,
      price: this.props.price,
      orderData: formData
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

  checkValidaty(value, rules){
    let isValid = true;
    
    if(!rules){
      return true
    }

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidaty(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

    }
    
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
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
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input 
              invalid={!formElement.config.valid}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
            />
          ))}
          <Button btnType="success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        
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
