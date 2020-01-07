import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Mail Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
            minLength: 10
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
    };

    this.checkValidaty = this.checkValidaty.bind(this)
    this.inputChangedHandler = this.inputChangedHandler.bind(this)
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

  inputChangedHandler = (event, controlName) => {
   console.log(controlName)
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidaty(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
    console.log(this.state)
  }

  render() {
    const formElementsArray = [];
    console.log(this.state.controls);
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const form = formElementsArray.map((formElement) => (
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

    ));

    return (
      <div className="Auth">

        <form>
          {form}
          <Button btnType="success">
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
