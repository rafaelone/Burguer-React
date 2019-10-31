import React, { Component } from 'react';
import { connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import './ContactData.css';
import Auxi from '../../../hoc/Auxi';
import axios from '../../../Axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

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
    };

  orderHandler = event => {
    event.preventDefault();
    const { ings, price } = this.props;
    const formData = {}
    for (let  formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      Ingredients: ings,
      price: price,
      orderData: formData
    }
    
   
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
        <form >
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
          <Button btnType="success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>
        
      </Auxi>
    );

    if(this.props.loading){
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

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => ({
  onOrderBurguer: orderData => dispatch(actions.purchaseBurger(orderData))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
