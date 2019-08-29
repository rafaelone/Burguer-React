import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component{
  constructor(props){
    super(props)
    this.state = {
      ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 2,
        meat: 2
      }
    }
  }
  render(){
    const { ingredients } = this.state;
    return(
      <Aux>
        <Burger ingredients={ingredients}/>
        <div>Build Controls</div>
      </Aux>
    )
  }
}

export default BurgerBuilder