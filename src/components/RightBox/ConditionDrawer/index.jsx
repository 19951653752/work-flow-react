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
        label: '?????????'
      },
      {
        value: '2',
        label: '????????????'
      },
      {
        value: '3',
        label: '????????????'
      },
      {
        value: '4',
        label: '????????????'
      },
      {
        value: '5',
        label: '????????????'
      }
    ],
    conOptions: [
      {
        value: '1',
        label: '??????'
      },
      {
        value: '2',
        label: '?????????'
      },
      {
        value: '3',
        label: '??????'
      },
      {
        value: '4',
        label: '????????????'
      },
      {
        value: '5',
        label: '??????'
      },
      {
        value: '6',
        label: '????????????'
      },
      {
        value: '7',
        label: '??????'
      },
      {
        value: '8',
        label: '????????????'
      },
      {
        value: '9',
        label: '??????'
      },
      {
        value: '10',
        label: '?????????'
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
            <TabPane tab="??????????????????" key="1">
              <NodeWrap nodeConfig={conForm} />
              <Button style={{ marginTop: '100px' }} onClick={this.submit}>??????</Button>
            </TabPane>
          </Tabs>
        </div>
        : ''
        }
      </div>
    )
  }
}
