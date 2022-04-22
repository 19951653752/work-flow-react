import styles from './index.less';

import React, { Component } from 'react'
import '../css/workflow.css'

import NodeWrap from '../components/nodeWrap'
import RightBox from '../components/RightBox'

import dataJson from '../data.js'

import { observer } from 'mobx-react';
import ProductStore from '../stores/product'

@observer
export default class index extends Component {
  state = {
    nodeConfig: dataJson.data.nodeConfig,
    flowPermission: []
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
  }
  render() {
    const { nodeConfig } = this.state
    console.log(nodeConfig)
    console.log(ProductStore.productId)
    // ProductStore.setProduct(this.state.nodeConfig)
    // console.log(ProductStore.productId)
    // const nodeConfig = ProductStore.productId
    return (
      <div>
        <div className="fd-nav-content">
          <section className="dingflow-design">
            <div className="box-scale" id="box-scale" style={{ transform: "scale('+nowVal/100+')", transformOrigin: "50% 0px 0px" }}>
              <NodeWrap nodeConfig={nodeConfig} flowPermission={this.state.flowPermission} addTremInfo={this.addTremInfo} delNode={this.delNode} getNodeConfig={this.getNodeConfig}></NodeWrap>
              {/* <NodeWrap :nodeConfig.sync="nodeConfig" :flowPermission.sync="flowPermission"></NodeWrap> */}
            </div>
          </section >
        </div>
        {/* <RightBox /> */}
      </div>
    )
  }
}
