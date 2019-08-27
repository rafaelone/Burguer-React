import React from 'react'
import Aux from '../../hoc/Aux';

const layout = ({children}) => (
  <Aux>
    <div>Toolba, SiderDrawer, backgrop  </div>
    <main>
      {children}
    </main>
  </Aux>
);

export default layout;