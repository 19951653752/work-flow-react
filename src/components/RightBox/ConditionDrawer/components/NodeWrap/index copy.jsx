import React, { Component } from 'react'
import { Select, Input } from 'antd';
import styles from './index.less'

export default class NodeWrap extends Component {
  state = {
    nodeConfig: this.props.nodeConfig,
    comOptions: [
      {
        value: '1',
        label: '填表人'
      },
      {
        value: '2',
        label: '单选组件'
      },
      {
        value: '3',
        label: '多选择将'
      },
      {
        value: '4',
        label: '下拉组件'
      },
      {
        value: '5',
        label: '数字组件'
      }
    ],
    conOptions: [
      {
        value: '1',
        label: '等于'
      },
      {
        value: '2',
        label: '不等于'
      },
      {
        value: '3',
        label: '大于'
      },
      {
        value: '4',
        label: '大于等于'
      },
      {
        value: '5',
        label: '小于'
      },
      {
        value: '6',
        label: '小于等于'
      },
      {
        value: '7',
        label: '介于'
      },
      {
        value: '8',
        label: '包含任意'
      },
      {
        value: '9',
        label: '为空'
      },
      {
        value: '10',
        label: '不为空'
      }
    ],
    valueOptions: [

    ]
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.nodeConfig)
    console.log(this.props.nodeConfig)
    if (nextProps.nodeConfig !== this.props.nodeConfig) {
      this.setState({
        nodeConfig: nextProps.nodeConfig
      })
    }
  }
  mouseEnter = () => {
    console.log(123)
    this.setState({ conBtnVisible: true })
  }
  mouseLeave = () => {
    this.setState({ conBtnVisible: false })
  }
  handleComChange = (index) => {
    return (value) => {
      const { nodeConfig } = this.state
      nodeConfig.conditions[index].comValue = value
      this.setState(nodeConfig)
    }
  }
  handleConChange = (index) => {
    return (value) => {
      const { nodeConfig } = this.state
      nodeConfig.conditions[index].conValue = value
      this.setState(nodeConfig)
    }

  }
  inputChange = (index) => {
    return (e) => {
      const { nodeConfig } = this.state
      nodeConfig.conditions[index].value1 = e.target.value
      this.setState({ nodeConfig })
    }

  }
  addCon = () => {
    const { nodeConfig } = this.state
    console.log(nodeConfig)
    nodeConfig.conditions.push({
      id: Date.now() + '',
      comValue: undefined,
      conValue: undefined,
      value1: '',
      value2: ''
    })
    this.setState({ nodeConfig })
  }
  addConGroup = () => {
    const { nodeConfig } = this.state
    const obj = {
      policy: 'and1',
      conditions: [
        {
          id: Date.now() + '',
          comValue: undefined,
          conValue: undefined,
          value1: '',
          value2: ''
        }
      ],
      children: []
    }
    nodeConfig.children.push(obj)
    console.log(nodeConfig)
    this.setState({ nodeConfig })
  }
  submit = () => {
    console.log(this.state)
  }
  render() {
    let length = 0
    console.log(this.props.nodeConfig)
    console.log(this.state.nodeConfig)
    const { nodeConfig } = this.state
    return (
      <div className={styles.conBox}>
        <div onMouseLeave={this.mouseLeave} className={styles.conTool}>
          <button hover onMouseEnter={this.mouseEnter} className={styles.conButton}>并且</button>
          <span style={{ display: this.state.conBtnVisible ? 'inline' : 'none' }}>
            <button className={styles.conButton}>或者</button>
            <button className={styles.addConButton} onClick={this.addCon}>添加条件</button>
            <button className={styles.addConButton} onClick={this.addConGroup}>添加条件组</button>
          </span>
        </div>
        <div className={styles.itemBox}>
        {
          nodeConfig.children.length > 0 ?
          nodeConfig.children.map((item, index) => {
            length += nodeConfig.children[index].conditions.length * 53 + 35 + 10
            console.log(length)
            return <div className={styles.cusBefore} style={{ height:  (nodeConfig.conditions.length * 53 + 10) + (nodeConfig.children.length > 0 && (nodeConfig.children[index].conditions.length * 53 + 35 + 10) / 2) + length - (nodeConfig.children[index].conditions.length * 53 + 35 + 10) + 'px'}}></div>
          })
          :
          <div className={styles.cusBefore} style={{ height:  (nodeConfig.conditions.length * 53 - (53 / 2)) + 10 + 'px'}}></div>
        }
          {
            nodeConfig.conditions.map((item, index) => {
              return <div className={styles.item} key={index}>
                <Select placeholder="请选择" value={item.comValue} style={{ width: 100 }} onChange={this.handleComChange(index)}>
                  {
                    this.state.comOptions.map(i => {
                      return <Option key={i.value} value={i.value}>{i.label}</Option>
                    })
                  }
                </Select>
                <Select placeholder="请选择" value={item.conValue} style={{ width: 100, marginLeft: '10px' }} onChange={this.handleConChange(index)}>
                  {
                    this.state.conOptions.map(i => {
                      return <Option key={i.value} value={i.value}>{i.label}</Option>
                    })
                  }
                </Select>
                {
                  item.conValue !== '7'
                    ?
                    <Input value={item.value1} style={{ width: '70px', marginLeft: '10px' }} placeholder="Basic usage" onChange={this.inputChange(index)} />
                    :
                    <span>
                      <Input value={item.value1} style={{ width: '70px', marginLeft: '10px', marginRight: '3px' }} placeholder="Basic usage" />
                      ~
                      <Input value={item.value2} style={{ width: '70px', marginLeft: '3px' }} placeholder="Basic usage" />
                    </span>
                }
                {
                  nodeConfig.children.length === 0 && nodeConfig.conditions.length - 1 === index ?
                  '' : <div className={styles.cusAfter}></div> 
                }
              </div>
            })
          }
          {/* { nodeConfig.conditions.length } */}
          {/* {
            nodeConfig.children.length > 0 ? 
            <div className={styles.cusAfter} style={{ top:  (nodeConfig.conditions.length * 53) + (nodeConfig.children.length > 0 && (nodeConfig.children[0].conditions.length * 53 + 35) / 2) + 10 +  'px'}}></div>
            : ''
          } */}
          {

            nodeConfig.children.length > 0 ?
              nodeConfig.children.map((item,index) => {
                return <NodeWrap nodeConfig={item} />
              })
              : ''
          }
        </div>
      </div>
    )
  }
}
