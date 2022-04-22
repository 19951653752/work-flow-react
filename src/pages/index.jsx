import styles from './index.less';

import React, { Component } from 'react'
import '../css/workflow.css'

import NodeWrap from '../components/NodeWrap'
// import ReviewerDrawer from '.@/components/RightBox/DefaultDrawer'
import ReviewerDrawer from '@/components/RightBox/ReviewerDrawer'
// import ReviewerDrawer from '.@/components/RightBox/ConditionDrawer'

import dataJson from '../data.js'

import { observer } from 'mobx-react';
import ProductStore from '../stores/product'

@observer
export default class index extends Component {
  state = {
    nodeConfig: dataJson.data.nodeConfig,
    flowPermission: [],
    nodeInfo: null
  }
  delNode = (e) => {
    console.log(e)
    const { nodeConfig } = this.state
    this.setState({
      nodeConfig: e
    })
  }
  getNodeConfig = (e) => {
    console.log(e)
    this.setState({
      nodeInfo: e
    })
    console.log(this.state.nodeConfig)
  }
  onClick = () => {
    const { nodeInfo } = this.state
    nodeInfo.nodeName = '王二狗'
    this.setState({
      nodeInfo
    })
  }
  render() {
    const { nodeConfig, nodeInfo } = this.state
    // console.log(nodeConfig)
    // console.log(ProductStore.productId)
    // ProductStore.setProduct(this.state.nodeConfig)
    // console.log(ProductStore.productId)
    // const nodeConfig = ProductStore.productId
    return (
      <div>
        <div className="fd-nav-content">
          <section className="dingflow-design">
            <div className="box-scale" id="box-scale" style={{ transform: "scale('+nowVal/100+')", transformOrigin: "50% 0px 0px" }}>
              <NodeWrap nodeConfig={nodeConfig} flowPermission={this.state.flowPermission} getNodeConfig={this.getNodeConfig}></NodeWrap>
            </div>
          </section >
        </div>
        {/* <DefaultDrawer /> */}
        <ReviewerDrawer nodeInfo={nodeInfo} getNodeConfig={this.getNodeConfig} />
        {/* <ConditionDrawer nodeInfo={nodeInfo} getNodeConfig={this.getNodeConfig} /> */}
        <button onClick={this.onClick}>按钮</button>
      </div>
    )
  }
}
