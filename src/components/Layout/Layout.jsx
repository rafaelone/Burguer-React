import React from 'react'
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/ToolBar/Toolbar'
import './Layout.css'

const layout = ({children}) => (
  <Aux>
    <Toolbar />
    <main className='content'>
      {children}
    </main>
  </Aux>
);

export default layout;