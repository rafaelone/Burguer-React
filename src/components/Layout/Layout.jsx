import React from 'react'
import Aux from '../../hoc/Aux';
import './Layout.css'

const layout = ({children}) => (
  <Aux>
    <div>Toolba, SiderDrawer, backgrop  </div>
    <main className='content'>
      {children}
    </main>
  </Aux>
);

export default layout;