import React, { Component } from 'react'

import { Drawer } from 'antd'

import { observer } from 'mobx-react'
import stateStore from '@/stores/state'

@observer
export default class Index extends Component {
  onClose = () => {
    
  }
  render() {
  const visible = stateStore.promoterDrawer
  return(
      <div>
        <Drawer title="Basic Drawer" placement="right" onClose={this.onClose} visible={visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div >
    ) 
  } 
}
