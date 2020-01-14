import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
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
      isSignup: true
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
  }

  submitHandler = (event) => {
    event.preventDefault()
    
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup}
    })
  }

  render() {
    const formElementsArray = [];
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

        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="success" clicked={this.submitHandler}>
            SUBMIT
          </Button>
          
    </form>
    <Button 
      btnType="danger"
      clicked={this.switchAuthModeHandler}
      >
        SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password,isSignup))
})

export default connect(null, mapDispatchToProps)(Auth);
