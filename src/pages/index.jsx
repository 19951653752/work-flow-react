import React, { Component } from 'react'

import { Modal } from 'antd'

import '../css/workflow.css'
import '@/icons/myfont/iconfont.css'
import styles from './index.less';

import NodeWrap from '../components/NodeWrap'
import DefaultDrawer from '@/components/RightBox/DefaultDrawer'
import ReviewerDrawer from '@/components/RightBox/ReviewerDrawer'
import ConditionDrawer from '@/components/RightBox/ConditionDrawer'

import dataJson from '../data.js'

import { observer } from 'mobx-react';
import ProductStore from '../stores/product'

@observer
export default class index extends Component {
  state = {
    nodeConfig: dataJson.data.nodeConfig,
    flowPermission: [],
    nodeInfo: null,
    nowVal: 100
  }
  delNode = (e) => {
    // console.log(e)
    const { nodeConfig } = this.state
    this.setState({
      nodeConfig: e
    })
  }
  getNodeConfig = (e) => {
    // console.log(e)
    this.setState({
      nodeInfo: e
    })
    // console.log(this.state.nodeConfig)
  }
  onClick = () => {
    const { nodeInfo } = this.state
    nodeInfo.nodeName = '王二狗'
    this.setState({
      nodeInfo
    })
  }
  zoomSize(type) {
    return () => {
      console.log(type)
      let { nowVal } = this.state
      if (type == 1) {
        if (nowVal == 50) {
          return;
        }
        // nowVal -= 10;
        this.setState({ nowVal: nowVal - 10 })
      } else {
        if (nowVal == 300) {
          return;
        }
        // nowVal += 10;
        this.setState({ nowVal: nowVal + 10 })
      }
    }
  }
  render() {
    const { nodeConfig, nodeInfo, nowVal } = this.state
    // console.log(nodeConfig)
    // console.log(ProductStore.productId)
    // ProductStore.setProduct(this.state.nodeConfig)
    // console.log(ProductStore.productId)
    // const nodeConfig = ProductStore.productId
    return (
      <Modal bodyStyle={{ padding: '0' }} title="Basic Modal" visible={true} footer={null} width="90%">
        <div className='fd-nav-box'>
          <div className="fd-nav-content">
            <section className="dingflow-design">
              <div className="zoom">
                <div className={`zoom-out ${nowVal == 50 ? ' disabled' : ''}`} onClick={this.zoomSize(1)}>&#xe711;</div>
                {/* <span>{ nowVal }%</span> */}
                <div className="zoom-text">{nowVal}%</div>
                <div className={`zoom-in ${nowVal == 300 ? ' disabled' : ''}`} onClick={this.zoomSize(2)}>&#xe65b;</div>
              </div>
              <div className="box-scale" id="box-scale" style={{ transform: 'scale(' + nowVal / 100 + ')', transformOrigin: "50% 0px 0px" }}>
                <NodeWrap nodeConfig={nodeConfig} flowPermission={this.state.flowPermission} getNodeConfig={this.getNodeConfig}></NodeWrap>
                <div className="end-node">
                  <div className="end-node-circle"></div>
                  <div className="end-node-text">
                    <div className="cus-node cus-node-end">
                      <div className="icon-box">
                        &#xe6a4;
                      </div>
                      <div className="cus-node-text-end">结束流程</div>
                    </div>
                  </div>
                </div>
                {/* <div className="cus-node cus-node-end">
              <div className="icon-box">
              &#xe6a4;
              </div>
              <div className="cus-node-text-end">结束流程</div>
            </div> */}
              </div>
            </section >
          </div>
          <DefaultDrawer nodeInfo={nodeInfo} getNodeConfig={this.getNodeConfig} />
          <ReviewerDrawer nodeInfo={nodeInfo} getNodeConfig={this.getNodeConfig} />
          <ConditionDrawer nodeInfo={nodeInfo} getNodeConfig={this.getNodeConfig} />
        </div>
        <button onClick={this.onClick}>按钮</button>
      </Modal>
    )
  }
}
