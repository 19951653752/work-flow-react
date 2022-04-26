import React, { Component } from 'react'

import { Input, Tree, Button } from 'antd';

import styles from './index.less';

import treeData from './treeData.js'

export default class Transfer extends Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    checkedKeys: ['0-0-0', '0-0-0-1'],
    selectedKeys: [],
    autoExpandParent: true,
  }
  onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    this.setState({ expandedKeys: expandedKeysValue })
    this.setState({ autoExpandParent: false })
  }
  onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    this.setState({ checkedKeys: checkedKeysValue })
  }
  onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys: selectedKeysValue })
  }
  render() {
    console.log(treeData)
    console.log(this.props)
    const { expandedKeys, checkedKeys, selectedKeys, autoExpandParent } = this.state
    const { visible } = this.props
    return (
      <div style={{ display: visible ? 'block' : 'none' }} className={styles.customTransfer}>
        <div className={styles.header}>
          <div className={styles.title}>添加成员</div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftBox}>
            <div className={styles.leftTitle}>
              可选
            </div>
            <div className={styles.leftContent}>
              <div className={styles.leftInput}>
                <Input placeholder="按人员名称搜索" size='small' />
              </div>
              <div className={styles.leftTree}>
                <Tree
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </div>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.rightTitle}>
              已选（{checkedKeys.length}）
            </div>
            <div className={styles.rightContent}>
              <div className={styles.rightTree}>
                <div>
                  {
                    checkedKeys.map((item, index) => {
                      return <div className={styles.item}>{item}</div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={this.props.closeTransfer} type="primary">保存</Button>
          <Button onClick={this.props.closeTransfer}>取消</Button>
        </div>
      </div>
    )
  }
}
