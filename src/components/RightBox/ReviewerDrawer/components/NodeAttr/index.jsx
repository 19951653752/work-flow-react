import React, { Component } from 'react'

import { Tabs, Form, Input, Button, Checkbox, Radio, Tooltip } from 'antd';

import { SearchOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import Transfer from './components/Transfer'

import styles from './index.less';

// import '../../../../icons/myfont/iconfont.css'


export default class NodeAttr extends Component {
  resolveInputRef = React.createRef()
  rejectInputRef = React.createRef()
  state = {
    nodeInfo: this.props.nodeInfo,
    form: {
      name: '',
      describe: '',
      checkBy: 1,
      checkedList: ['张三', '李四', '王二狗', '清空'],
      resolve: ['通过'],
      reject: ['不通过'],
      checkType: 1
    },
    transferVisible: false,
    resolveInputVisible: false,
    resolveCostomInputVisible: true,
    rejectInputVisible: false,
    rejectCostomInputVisible: true
  }
  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  openTransfer = () => {
    this.setState({
      transferVisible: true
    })
  }
  closeTransfer = () => {
    this.setState({
      transferVisible: false
    })
  }
  addOpinion = (type) => {
    return (e) => {
      setTimeout(() => {
        this[type + 'InputRef'].current.focus()
      })
      this.setState({ [type + 'InputVisible']: true })
      this.setState({ [type + 'CostomInputVisible']: false })
    }
  }
  delOpinion = (type, item, index) => {
    return (e) => {
      const { form } = this.state
      form[type].splice(index, 1)
      this.setState({ form })
    }
  }
  addInputBlur = (type) => {
    return (e) => {
      const { target: { value } } = e
      if (value) {
        this.state.form[type].push(value)
        const form = {
          ...this.state.form,
          type
        }
        this.setState({ form })
        e.target.value = ''
      }
      this.setState({ [type + 'InputVisible']: false })
      this.setState({ [type + 'CostomInputVisible']: true })
    }
  }
  edterKeyUp = (type) => {
    return (e) => {
      const { code, target: { value } } = e
      console.log(value)
      if (code === 'Enter') {
        if (value) {
          this.state.form[type].push(value)
          const form = {
            ...this.state.form,
            type
          }
          this.setState({ form })
          e.target.value = ''
        }
        this.setState({ [type + 'InputVisible']: false })
        this.setState({ [type + 'CostomInputVisible']: true })
      }
    }
  }
  formChange = (type) => {
    return (e) => {
      const form = {
        ...this.state.form,
        [type]: e.target.value
      }
      this.setState({ form })
    }
  }
  RadioChange = (e) => {
    console.log(e.target.value)
  }
  submit = () => {
    console.log(this.state.form)
    const { nodeInfo } = this.state
    console.log(nodeInfo)
    nodeInfo.nodeName = '张三'
    this.setState({
      nodeInfo
    })
    this.props.getNodeConfig(nodeInfo)
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.nodeInfo !== this.props.nodeInfo) {
    this.setState({
      nodeInfo: nextProps.nodeInfo
    })
    // }
  }
  render() {
    console.log(this.props.nodeInfo)
    // const { nodeInfo } = this.state
    console.log(this.state.nodeInfo)
    // nodeInfo.nodeName = '张三'
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    return (
      <div className={styles.nodeAttr}>
        <div className={styles.header}>
          {/* <h2>条件分支设置</h2> */}
        </div>
        <div className={styles.form}>
          {/* <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          > */}
          <div className={styles.inputBox}>
            <div className={styles.label}>名称</div>
            <Input placeholder="请输入名称" style={{ borderRadius: '5px' }} onChange={this.formChange('name')} />
          </div>
          <div className={styles.inputBox} style={{ marginTop: '12px' }}>
            <div className={styles.label}>描述</div>
            <TextArea rows={3} placeholder="请输入描述" style={{ borderRadius: '5px' }} onChange={this.formChange('describe')} />
          </div>

          {/* 审核人设置 */}
          <div className={styles.checkBox}>
            <div className={styles.title}>审核人设置</div>
            <div className={styles.radioBox}>
              <Radio.Group onChange={this.formChange('checkBy')} value={this.state.form.checkBy}>
                <Radio value={1}>选择成员</Radio>
                <Radio value={2}>选择角色</Radio>
                <Radio value={3}>动态群组</Radio>
              </Radio.Group>
            </div>
            {/* {
              this.state.form.checkBy === 1 ?
                <h1>你好</h1> : ''
            } */}
            <div className={styles.btnBox}>
              <Button type="primary" onClick={this.openTransfer}>{this.state.form.checkBy === 1 ? '添加成员' : this.state.form.checkBy === 2 ? '添加角色' : '添加群组'}</Button>
            </div>
            <div className={styles.selectBox}>
              {/* <Button size="small">张三</Button> */}
              {
                this.state.form.checkedList.map(item => {
                  return item === '清空' ? <span className={styles.clearBtn} size="small"><span>&#xe70f;</span>{item}</span> :
                    <span className={styles.listBtn} size="small">{item} <span>&#xe6f3;</span></span>
                })
              }
            </div>
            <Transfer visible={this.state.transferVisible} closeTransfer={this.closeTransfer} />
          </div>
          <div className={styles.dashed}></div>
          {/* 审核动作 */}
          <div className={`${styles.checkBox} ${styles.checkAction}`}>
            <div className={styles.title}>
              审核动作
              <Tooltip
                placement="rightTop"
                title="你可以给表单命名，在此输入表单的名称"
                color="#B1B1B1"
              >
                <span
                  className={`iconfont`}
                  style={{ color: '#BDBDBD', cursor: 'pointer' }}
                >
                  &#xe63c;
                </span>
              </Tooltip>
            </div>
            <div className={styles.resolve}>
              <span className={styles.label}>通过意见</span>
              {
                this.state.form.resolve.map((item, index) => {
                  return <span className={`${styles.custonButton} ${styles.successButton}`}>{item}<i className={styles.delete}><MinusOutlined onClick={this.delOpinion('resolve', item, index)} /></i></span>
                })
              }

              <span style={{ display: this.state.resolveInputVisible ? 'inline-block' : 'none' }} className={`${styles.custonButton} ${styles.addSuccessButton}`}><input ref={this.resolveInputRef} onKeyUp={this.edterKeyUp('resolve')} onBlur={this.addInputBlur('resolve')} className={styles.addSuccessInput} type="text"></input></span>
              <span style={{ display: this.state.resolveCostomInputVisible ? 'inline-block' : 'none' }} onClick={this.addOpinion('resolve')} className={styles.custonButton}><PlusOutlined />自定义</span>
            </div>
            <div className={styles.reject}>
              <span className={styles.label}>驳回意见</span>
              {
                this.state.form.reject.map((item, index) => {
                  return <span className={`${styles.custonButton} ${styles.errorButton}`}>{item}<i className={styles.delete}><MinusOutlined onClick={this.delOpinion('reject', item, index)} /></i></span>
                })
              }

              <span style={{ display: this.state.rejectInputVisible ? 'inline-block' : 'none' }} className={`${styles.custonButton} ${styles.addErrorButton}`}><input ref={this.rejectInputRef} onKeyUp={this.edterKeyUp('reject')} onBlur={this.addInputBlur('reject')} className={styles.addErrorInput} type="text"></input></span>
              <span style={{ display: this.state.rejectCostomInputVisible ? 'inline-block' : 'none' }} onClick={this.addOpinion('reject')} className={styles.custonButton}><PlusOutlined />自定义</span>
            </div>
          </div>
          <div className={styles.dashed}></div>
          {/* 审批方式 */}
          <div className={styles.checkBox}>
            <div className={styles.title}>审批方式</div>
            <div className={styles.radioBox}>
              <Radio.Group onChange={this.formChange('checkType')} value={this.state.form.checkType}>
                <div className={styles.radioTip}>
                <Radio style={{ fontWeight: '600' }} value={1}>会签</Radio>
                  <Tooltip
                    placement="rightTop"
                    title="需所有审批人同意"
                    color="#B1B1B1"
                  >
                    <span
                      className={`iconfont`}
                      style={{ color: '#BDBDBD', cursor: 'pointer', marginLeft: '-6px' }}
                    >
                      &#xe63c;
                    </span>
                  </Tooltip>
                </div>
                <div className={styles.radioTip} style={{ marginLeft: '30px' }}>
                <Radio style={{ fontWeight: '600' }} value={2}>或签</Radio>
                  <Tooltip
                    placement="rightTop"
                    title="一名审批人同意或拒绝即可"
                    color="#B1B1B1"
                  >
                    <span
                      className={`iconfont`}
                      style={{ color: '#BDBDBD', cursor: 'pointer',  marginLeft: '-6px' }}
                    >
                      &#xe63c;
                    </span>
                  </Tooltip>
                </div>
              </Radio.Group>
            </div>
          </div>
          <div className={styles.submit}>
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
          </div>
        </div>
        <div className={styles.content}>
        </div>
        <div className={styles.button}></div>
      </div>
    )
  }
}
