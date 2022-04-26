import React, { Component } from 'react'

import { Tabs, Form, Input, Button, Checkbox } from 'antd'

import NodeAttr from './components/NodeAttr/index.jsx'
import FormPower from './components/FormPower/index.jsx'

import { observer } from 'mobx-react'
import StateStore from '@/stores/state'

import styles from './index.less'

@observer
export default class RightBox extends Component {
  state = {
    name: '',
    describe: '',
    nodeInfo: this.props.nodeInfo,
  }
  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  inputChange = (value, index) => {
    console.log(this.state)
    console.log(value)
    console.log(index)
  }
  submit = () => {
    console.log(this.state)
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.nodeInfo !== this.props.nodeInfo) {
      this.setState({
        nodeInfo: nextProps.nodeInfo
      })
    // }
  }
  onClick = () => {
    const { nodeInfo } = this.state
    nodeInfo.nodeName = '陈老六'
    this.setState({
      nodeInfo
    })
    this.props.getNodeConfig(nodeInfo)
    StateStore.setReviewer(false)
    StateStore.setDefault(true)
  }
  render() {
    // console.log(this.props.nodeInfo)
    // console.log(stateStore.promoterDrawer)
    const { nodeInfo } = this.props
    // console.log(nodeInfo)
    const { TabPane } = Tabs;
    const drawerVisible = StateStore.reviewerDrawer
    return (
      <div>
        {
          drawerVisible ? 
          <div className={styles.drawerBox}>
          {/* <button onClick={this.onClick}>按钮</button> */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="节点设置属性" key="1">
              <NodeAttr nodeInfo={nodeInfo} getNodeConfig={this.props.getNodeConfig} />
            </TabPane>
            <TabPane tab="节点设置属性" key="2">
              <FormPower nodeInfo={nodeInfo} />
            </TabPane>
          </Tabs>
        </div>
        : ''
        }
      </div>
    )
  }
}
