import React, { Component } from 'react'
import func from '../../plugins/preload'

import AddNode from '../addNode'

import { observer } from 'mobx-react';
import ProductStore from '../../stores/product'


// @observer
export default class NodeWrap extends Component {
  state = {
    nodeConfig: this.props.nodeConfig,
    isTried: false,
    isInput: false,
    $func: func,
    placeholderList: ["发起人", "审核人", "抄送人"],
    isInputList: [],
    nodeInfo: null, // 存储子组件传来的数据
    tempBoo: false
  }
  clickEvent = () => {
    return () => {

    }
  }
  setPerson = () => {
    return () => {

    }
  }
  delTerm = (index) => {
    return () => {
      const { nodeConfig, $func } = this.state
      nodeConfig.conditionNodes.splice(index, 1)
      nodeConfig.conditionNodes.map((item, index) => {
        item.priorityLevel = index + 1
        item.nodeName = `条件${index + 1}`
      })
      for (var i = 0; i < nodeConfig.conditionNodes.length; i++) {
        nodeConfig.conditionNodes[i].error = $func.conditionStr(nodeConfig, i) == "请设置条件" && i != nodeConfig.conditionNodes.length - 1
      }
      // this.$emit("update:nodeConfig", this.nodeConfig)
      this.props.updataNode(nodeConfig)
      this.forceUpdate()
      if (nodeConfig.conditionNodes.length == 1) {
        if (nodeConfig.childNode) {
          if (nodeConfig.conditionNodes[0].childNode) {
            this.reData(nodeConfig.conditionNodes[0].childNode, nodeConfig.childNode)
          } else {
            nodeConfig.conditionNodes[0].childNode = nodeConfig.childNode
          }
        }
        // this.$emit("update:nodeConfig", this.nodeConfig.conditionNodes[0].childNode)
        this.props.updataNode(nodeConfig.conditionNodes[0].childNode)
        // this.setState({
        //   nodeConfig: nodeConfig.childNode
        // })
      }
    }
  }
  reData = (data, addData) => {
    if (!data.childNode) {
        data.childNode = addData
    } else {
        this.reData(data.childNode, addData)
    }
  }
  arrTransfer = () => {

  }
  delNode = (index) => {
    console.log(index)
    const { nodeConfig } = this.state
    // this.setState({
    //   nodeConfig: nodeConfig.childNode
    // })
    console.log(this.props)
    console.log(nodeConfig)
    this.props.updataNode(nodeConfig.childNode)
  }
  updataNode = (index) => {
    return (e) => {
      const { nodeConfig } = this.state
      console.log(index)
      console.log(e)
      console.log(nodeConfig)
      if (index === undefined) {
        nodeConfig.childNode = e
      } else {
        nodeConfig.conditionNodes[index].childNode = e
      }
      this.setState({
        nodeConfig
      })
    }
  }
  addTerm = () => {
    const { nodeConfig, $func } = this.state
    let len = nodeConfig.conditionNodes.len + 1
    nodeConfig.conditionNodes.push({
      "nodeName": "条件" + len,
      "type": 3,
      "priorityLevel": len,
      "conditionList": [],
      "nodeUserList": [],
      "childNode": null
    })
    for (let i = 0; i < nodeConfig.conditionNodes.length; i++) {
      nodeConfig.conditionNodes[i].err = $func.conditionStr(nodeConfig, i) == '请设置条件' && i != nodeConfig.conditionNodes.length - 1
    }
    this.props.addTremInfo(nodeConfig)
  }
  addTremInfo = (nodeConfig) => {
    this.setState({
      nodeConfig
    })
  }
  // 给子组件传的事件
  addNodeInfo = (e, index) => {
    const { nodeConfig } = this.state
    console.log(nodeConfig)
    console.log(index)
    // 主流程添加节点
    if (index === undefined) {
      nodeConfig.childNode = e
    }
    // 分支流程添加节点
    else {
      nodeConfig.conditionNodes[index].childNode = e
    }
    this.setState({ nodeConfig })
  }
  nodeClick = (nodeConfig) => {
    return () => {
      console.log(this.props)
      this.props.getNodeConfig(nodeConfig)
      console.log(nodeConfig)
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.nodeConfig)
    console.log(nextProps.nodeConfig)
    if (nextProps.nodeConfig !== this.props.nodeConfig) {
      this.setState({
        nodeConfig: nextProps.nodeConfig
      })
    }
  }
  render() {
    console.log(this.state.nodeConfig)
    const { isTried, isInput, $func, placeholderList, isInputList, nodeConfig } = this.state
    const { flowPermission } = this.props
    if (nodeConfig) {
      return (
        <div>
          {
            nodeConfig.type !== 4 ?
              <div className="node-wrap">
                <div onClick={this.nodeClick(nodeConfig)} className={`node-wrap-box ${nodeConfig.type == 0 ? 'start-node' : '' + isTried && nodeConfig.error ? 'active error' : ''} `}>
                  <div>
                    <div className="title" style={{ background: 'rgb(' + ['87, 106, 149', '255, 148, 62', '50, 150, 250'][nodeConfig.type] + ')' }}>
                      {
                        nodeConfig.type == 1 ?
                          <span className="iconfont"></span>
                          : ''
                      }
                      {
                        nodeConfig.type == 2 ?
                          <span className="iconfont"></span>
                          : ''
                      }
                      {
                        nodeConfig.type == 0 ?
                          <span>{nodeConfig.nodeName}</span>
                          : ''
                      }
                      {
                        nodeConfig.type != 0 && !isInput ?
                          <span className="editable-title" onClick={this.clickEvent}>{nodeConfig.nodeName}</span>
                          : ''
                      }
                      {
                        nodeConfig.type != 0 ?
                          <i className="anticon anticon-close close" onClick={this.delNode}></i>
                          : ''
                      }






                    </div>
                    <div className="content" onClick={this.setPerson}>
                      {
                        nodeConfig.type == 0 ?
                          <div className="text">{$func.arrToStr(flowPermission) ? $func.arrToStr(flowPermission) : '所有人'}</div>
                          : ''
                      }
                      {
                        nodeConfig.type == 1 ?
                          <div className="text">
                            {
                              !$func.setApproverStr(nodeConfig) ?
                                <span className="placeholder">请选择{placeholderList[nodeConfig.type]}</span>
                                : ''
                            }
                            {$func.setApproverStr(nodeConfig)}
                          </div>
                          : ''
                      }
                      {
                        nodeConfig.type == 2 ?
                          <div className="text">
                            {
                              !$func.copyerStr(nodeConfig) ?
                                <span className="placeholder">请选择{placeholderList[nodeConfig.type]}</span>
                                : ''
                            }
                            {$func.copyerStr(nodeConfig)}
                          </div>
                          : ''
                      }
                      <i className="anticon anticon-right arrow"></i>
                    </div>
                    <div>
                      {
                        isTried && nodeConfig.error ?
                          <div className="error_tip">
                            <i className="anticon anticon-exclamation-circle" style={{ color: 'rgb(242, 86, 67)' }}></i>
                          </div> : ''
                      }
                    </div>
                  </div>
                </div>
                <AddNode childNodeP={nodeConfig.childNode} addNodeInfo={this.addNodeInfo} getNodeConfig={this.props.getNodeConfig} updataNode={this.updataNode()}></AddNode>
              </div> : ''
          }
          {
            nodeConfig.type == 4 ?
              <div className="branch-wrap">
                <div className="branch-box-wrap">
                  <div className="branch-box">
                    <button className="add-branch" onClick={this.addTerm}>添加条件</button>




                    {
                      nodeConfig.conditionNodes.map((item, index) => {
                        return <div className="col-box" key={index}>
                          <div className="condition-node">
                            <div className="condition-node-box">
                              <div className={`auto-judge ${isTried && item.error ? 'error active' : ''}`}>
                                {
                                  index != 0 ?
                                    <div className="sort-left" onClick={this.arrTransfer(index, -1)}>&lt;</div>
                                    : ''
                                }
                                <div className="title-wrapper">
                                  {
                                    isInputList[index] ?
                                      <input type="text" className="ant-input editable-title-input"
                                        onBlur={this.blurEvent(index)} onFocus={event => event.currentTarget.select()} value={item.nodeName} />
                                      : ''
                                  }
                                  {
                                    !isInputList[index] ?
                                      <span className="editable-title" onClick={this.clickEvent(index)}>{item.nodeName}</span>
                                      : ''
                                  }
                                  <span className="priority-title" onClick={this.setPerson(item.priorityLevel)}>优先级{item.priorityLevel}</span>
                                  <i className="anticon anticon-close close" onClick={this.delTerm(index)}></i>
                                </div>
                                {
                                  index != nodeConfig.conditionNodes.length - 1 ?
                                    <div className="sort-right"
                                      onClick={this.arrTransfer(index)}>&gt;</div>
                                    : ''
                                }
                                <div className="content" onClick={this.setPerson(item.priorityLevel)}>{$func.conditionStr(nodeConfig,index)}</div>
                                {
                                  isTried && item.error ?
                                    <div className="error_tip">
                                      <i className="anticon anticon-exclamation-circle" style={{ color: rgb(242, 86, 67) }}></i>
                                    </div>
                                    : ''
                                }
                              </div>
                              <AddNode nodeConfig={item} index={index} childNodeP={item.childNode} addNodeInfo={this.addNodeInfo} getNodeConfig={this.props.getNodeConfig} updataNode={this.updataNode()}></AddNode>
                            </div>
                          </div>
                          {
                            item.childNode ?
                              <NodeWrap nodeConfig={item.childNode} addTremInfo={this.addTremInfo} delNode={this.delNode} getNodeConfig={this.props.getNodeConfig} updataNode={this.updataNode(index)}></NodeWrap>
                              : ''
                          }
                          {
                            index == 0 ?
                              <div className="top-left-cover-line"></div>
                              : ''
                          }
                          {
                            index == 0 ?
                              <div className="bottom-left-cover-line"></div>
                              : ''
                          }
                          {
                            index == nodeConfig.conditionNodes.length - 1 ?
                              <div className="top-right-cover-line"></div>
                              : ''
                          }
                          {
                            index == nodeConfig.conditionNodes.length - 1 ?
                              <div className="bottom-right-cover-line"></div>
                              : ''
                          }
                        </div>
                      })
                    }
                  </div>
                  <AddNode childNodeP={nodeConfig.childNode} addNodeInfo={this.addNodeInfo} getNodeConfig={this.props.getNodeConfig} updataNode={this.updataNode()}></AddNode>
                </div>
              </div> : ''
          }
          {
            nodeConfig.childNode ?
              <NodeWrap nodeConfig={nodeConfig.childNode} addTremInfo={this.addTremInfo} delNode={this.delNode} getNodeConfig={this.props.getNodeConfig} updataNode={this.updataNode()}></NodeWrap>
              : ''
          }
        </div >
      )
    }
    return null
  }
}
