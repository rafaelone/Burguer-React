import React, { Component } from 'react'
import Auxi from '../../hoc/Auxi';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) =>{
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render(){
    return (
      <Auxi>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}/>
        <main className='content'>
          {this.props.children}
        </main>
      </Auxi>
    );
  }
} 

export default Layout;