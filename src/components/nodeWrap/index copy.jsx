import React, { Component } from 'react'
import func from '../../plugins/preload'

import './style.css'

export default class NodeWrap extends Component {
  state = {
    isTried: false,
    isInput: false,
    $func: func,
    placeholderList: ["发起人", "审核人", "抄送人"],
    isInputList: [],
  }

  clickEvent = () => {
      
  }
  delTerm = () => {

  }
  arrTransfer = () => {

  }
  setPerson = () => {

  }
  render() {
    console.log(this.props.nodeConfig)
    // console.log(this.state.$func)
    const { isTried, isInput, $func, placeholderList, isInputList } = this.state
    const { nodeConfig, flowPermission } = this.props
    console.log(flowPermission)
    return (
      <div>
        {
          nodeConfig.style !== 4 ?
            <div className="node-wrap">
              <div className="node-wrap-box">
              <div className="title" style={{background: 'rgb('+ ['87, 106, 149','255, 148, 62','50, 150, 250'][nodeConfig.type] +')'}}>
                {
                  nodeConfig.type==1 ? 
                  <span className="iconfont"></span>
                  : ''
                }
                {
                  nodeConfig.type==2 ? 
                  <span className="iconfont"></span>
                  : ''
                }
                {
                  nodeConfig.type==0 ? 
                  <span>{nodeConfig.nodeName}</span>
                  : ''
                }
                {/* {
                  nodeConfig.type!=0&&isInput ? 
                  <input type="text" className="ant-input editable-title-input"
                  onBlur="blurEvent()" @focus="$event.currentTarget.select()" v-focus
                  v-model="nodeConfig.nodeName" :placeholder="placeholderList[nodeConfig.type]" />
                } */}
                {
                  nodeConfig.type!=0&&!isInput ? 
                  <span className="editable-title" onClick={this.clickEvent}>{nodeConfig.nodeName}</span>
                  : ''
                }
                {
                  nodeConfig.type!=0 ? 
                  <i className="anticon anticon-close close" onClick={this.delNode}></i>
                  : ''
                }
                        
                        
                        
                        
                        
                        
                    </div>
                    <div className="content" onClick="setPerson">
                        {
                          nodeConfig.type==0 ? 
                          <div className="text">{$func.arrToStr(flowPermission)?$func.arrToStr(flowPermission):'所有人'}</div>
                          : ''
                        }
                        {
                          nodeConfig.type==1 ? 
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
                          nodeConfig.type==2 ? 
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
            </div> : ''
        }
        {
          nodeConfig.type === 4 ?
          <div className="branch-wrap">
            <div className="branch-box-wrap">
                <div className="branch-box">
                    <button className="add-branch" onClick={this.addTerm}>添加条件</button>
                    {
                      nodeConfig.conditionNodes.map((item,index) => {
                        return <div className="col-box" key={index}>
                        <div className="condition-node">
                            <div className="condition-node-box">
                                <div className={`'auto-judge' ${isTried&&item.error?'error active':''}`}>
                                {
                                  index!=0 ? 
                                  <div className="sort-left" onClick={this.arrTransfer(index,-1)}>&lt;</div>
                                  : ''
                                }
                                    <div className="title-wrapper">
                                        {
                                          isInputList[index] ? 
                                          <input type="text" className="ant-input editable-title-input"
                                          onBlur={this.blurEvent(index)} onFocus={e => e.currentTarget.select()} value={item.nodeName} />
                                          : ''
                                        }
                                        {
                                          !isInputList[index] ? 
                                          <span className="editable-title" onClick={this.clickEvent(index)}>{item.nodeName}</span>
                                          : ''
                                        }
                                        <span className="priority-title" onClick="setPerson(item.priorityLevel)">优先级{item.priorityLevel}</span>
                                        <i className="anticon anticon-close close" onClick={this.delTerm(index)}></i>
                                    </div>
                                    {
                                      index!=nodeConfig.conditionNodes.length-1 ? 
                                      <div className="sort-right" onClick={this.arrTransfer(index)}>&gt;</div>
                                      : ''
                                    }
                                    <div className="content" onClick={this.setPerson(item.priorityLevel)}>{$func.conditionStr(nodeConfig,index)}</div>
                                    {
                                      isTried&&item.error ? 
                                      <div className="error_tip">
                                        <i className="anticon anticon-exclamation-circle" style={{color: 'rgb(242, 86, 67)'}}></i>
                                    </div>
                                    : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {
                          item.childNode ? 
                          <NodeWrap nodeConfig={item.childNode}></NodeWrap>
                          : ''
                        }
                        {
                          index==0 ? 
                          <div className="top-left-cover-line"></div>
                          : ''
                        }
                        {
                          index==0 ? 
                          <div className="bottom-left-cover-line"></div>
                          : ''
                        }
                        {
                          index==nodeConfig.conditionNodes.length-1 ? 
                          <div className="top-right-cover-line"></div>
                          : ''
                        }
                        {
                          index==nodeConfig.conditionNodes.length-1 ? 
                          <div className="bottom-right-cover-line"></div>
                          : ''
                        }
                    </div>
                      })
                    }
                </div>
            </div>
        </div> : ''
        }
        {
          nodeConfig.childNode ? 
          <NodeWrap nodeConfig={nodeConfig.childNode}></NodeWrap>
          : ''
        }
    </div >
    )
  }
}
