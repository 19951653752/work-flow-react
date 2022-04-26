import React, { Component } from 'react'

import { Popover, Button } from 'antd'

import styles from './index.less'
import '@/icons/myfont/iconfont.css'

import { observer } from 'mobx-react';
import ProductStore from '../../stores/product'

@observer
export default class AddNode extends Component {
  state = {
    visible: false
  }
  addNode = () => {
    // console.log(123)
    this.setState({ visible: true })
  }
  handleVisibleChange = visible => {
    // console.log(visible)
    this.setState({ visible })
  }
  addType = (type) => {
    return () => {
      const { childNodeP, index } = this.props
      console.log(this.props)
      console.log(this.props.index)
      this.setState({ visible: false })
      if (type != 4) {
        let data = ''
        if (type == 1) {
          data = {
            "id": "10086",
            "nodeName": "审核人",
            "error": true,
            "type": 1,
            "settype": 1,
            "selectMode": 0,
            "selectRange": 0,
            "directorLevel": 1,
            "examineMode": 1,
            "noHanderAction": 1,
            "examineEndDirectorLevel": 0,
            "childNode": childNodeP,
            "nodeUserList": []
          }
        } else if (type == 2) {
          data = {
            "nodeName": "抄送人",
            "type": 2,
            "ccSelfSelectFlag": 1,
            "childNode": childNodeP,
            "nodeUserList": []
          }
        }
        console.log(childNodeP)
        console.log(data)
        this.props.addNodeInfo(data, index)
      } else {
        let data = {
          "nodeName": "路由",
          "type": 4,
          "childNode": null,
          "conditionNodes": [{
            "nodeName": "条件1",
            "error": true,
            "type": 3,
            "priorityLevel": 1,
            "conditionList": [],
            "nodeUserList": [],
            "childNode": childNodeP,
          }, {
            "nodeName": "条件2",
            "type": 3,
            "priorityLevel": 2,
            "conditionList": [],
            "nodeUserList": [],
            "childNode": null
          }]
        }
        this.props.addNodeInfo(data, index)
      }
    }
  }
  // componentDidMount = () => {
  //   // console.log('--------')
  // }
  // setProductId = () => {
  //   ProductStore.setProduct(99999)
  // }
  render() {
    // console.log(this.props)
    return (
      <div className={styles.addNodeBtnBox}>
        <div className={styles.addNodeBtn}>
          <Popover content={
            <div className={styles.addNodePopoverBody}>
              <a className={`${styles.addNodePopoverItem} ${styles.approver}`} onClick={this.addType(1)}>
                <div className={styles.itemWrapper}>
                  <span className={styles.iconfont}>&#xe713;</span>
                </div>
                <p>审核人</p>
              </a>
              {/* <a className={`${styles.addNodePopoverItem} ${styles.notifier}`} onClick={this.addType(2)}>
                <div className={styles.itemWrapper}>
                  <span className={styles.iconfont}></span>
                </div>
                <p>抄送人</p>
              </a> */}
              <a className={`${styles.addNodePopoverItem} ${styles.condition}`} onClick={this.addType(4)}>
                <div className={styles.itemWrapper}>
                  <span className={styles.iconfont}>&#xe98e;</span>
                </div>
                <p>条件分支</p>
              </a>
            </div >
          } trigger="click" placement="right">
            <button onClick={this.addNode} className={styles.btn}>
              <span className={styles.iconfont}></span>
            </button>
          </Popover>
          {/* <button onClick={this.setProductId}>按钮</button> */}
        </div >
      </div >
    )
  }
}
