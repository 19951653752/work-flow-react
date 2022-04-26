import React, { Component } from 'react'

import { Tabs, Select, Input, Button } from 'antd';

import NodeWrap from './components/NodeWrap'

import { observer } from 'mobx-react'
import StateStore from '@/stores/state'

import styles from './index.less'

@observer
export default class ConditionDrawer extends Component {
  state = {
    name: '',
    describe: '',
    conBtnVisible: false,
    // comValue: undefined,
    // conValue: undefined,
    // value1: '',
    // value2: '',
    conForm: {
      policy: 'and',
      conditions: [
        {
          id: '1',
          comValue: '1',
          conValue: '1',
          value1: '',
          value2: ''
        },
        {
          id: '1',
          comValue: '1',
          conValue: '1',
          value1: '',
          value2: ''
        },
        {
          id: '1',
          comValue: '1',
          conValue: '1',
          value1: '',
          value2: ''
        }
      ],
      children: [
        {
          policy: 'and',
          conditions: [
            {
              id: '2',
              comValue: undefined,
              conValue: undefined,
              value1: '',
              value2: ''
            },
            {
              id: '2',
              comValue: undefined,
              conValue: undefined,
              value1: '',
              value2: ''
            }
          ],
          children: [
            {
              policy: 'and',
              conditions: [
                {
                  id: '3',
                  comValue: undefined,
                  conValue: undefined,
                  value1: '',
                  value2: ''
                },
                {
                  id: '3',
                  comValue: undefined,
                  conValue: undefined,
                  value1: '',
                  value2: ''
                }
              ],
              children: []
            },
            {
              policy: 'and',
              conditions: [
                {
                  id: '3',
                  comValue: undefined,
                  conValue: undefined,
                  value1: '',
                  value2: ''
                }
              ],
              children: []
            },
            {
              policy: 'and',
              conditions: [
                {
                  id: '3',
                  comValue: undefined,
                  conValue: undefined,
                  value1: '',
                  value2: ''
                }
              ],
              children: []
            }
          ]
        }
      ]
    },
    conList:[
      {
        id: '1',
        comValue: undefined,
        conValue: undefined,
        value1: '',
        value2: ''
      }
    ],
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
  mouseEnter = () => {
    console.log(123)
    this.setState({ conBtnVisible: true })
  }
  mouseLeave = () => {
    this.setState({ conBtnVisible: false })
  }
  handleComChange = (id) => {
    return (value) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.comValue = value
          item.conValue = undefined
          item.value1 = ''
          item.value2 = ''
        }
      })
      this.setState(conList)
    }
  }
  handleConChange = (id) => {
    return (value) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.conValue = value
          item.value1 = ''
          item.value2 = ''
        }
      })
      this.setState(conList)
    }

  }
  inputChange = (id) => {
    return (e) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.value1 = e.target.value
        }
      })
      
      this.setState({ conList })
    }
    
  }
  addCon = () => {
    const { conList } = this.state
    const obj = {
      id: Date.now() + '',
      comValue: undefined,
      conValue: undefined,
      value1: '',
      value2: ''
    }
    conList.push(obj)
    this.setState({ conList })
  }
  addConGroup = () => {

  }
  submit = () => {
    console.log(this.state)
  }
  render() {
    const { TabPane } = Tabs;
    const { Option } = Select;
    const drawerVisible = StateStore.conditionDrawer
    const { conForm } = this.state
    return (
      <div>
        {
          drawerVisible ? 
          <div className={styles.drawerBox}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="条件分支设置" key="1">
              <NodeWrap nodeConfig={conForm} />
              <Button style={{ marginTop: '100px' }} onClick={this.submit}>提交</Button>
            </TabPane>
          </Tabs>
        </div>
        : ''
        }
      </div>
    )
  }
}
