import React, { Component } from 'react'

import styles from './index.less'
import '@/icons/myfont/iconfont.css'

import { observer } from 'mobx-react'
import StateStore from '@/stores/state'

@observer
export default class DefaultDrawer extends Component {
  state = {
    stepArr: [
      {
        id: '01',
        tip: '添加流程（点击 + ）',
        img: require('@/imgs/next.png')
      },
      {
        id: '02',
        tip: '设置属性（审核人属性、条件分支属性）',
        img: require('@/imgs/next.png')
      },
      {
        id: '03',
        tip: '确认保存（完成审核流程配置）'
      }
    ]
  }
  onClose = () => {

  }
  render() {
    const drawerVisible = StateStore.defaultDrawer
    const { stepArr } = this.state
    console.log(stepArr)
    return (
      <div>
        {
          drawerVisible ?
            <div className={styles.drawerBox}>
              <div className={styles.drawerTitle}>审核流程步骤</div>
              <div className={styles.drawerContent}>
                {
                  stepArr.map((item, index) => {
                    return <div className={styles.item}>
                      <div className={styles.itemId}>
                        { item.id }
                      </div>
                      <div className={styles.itemContent}>
                        { item.tip }
                      </div>
                      <div className={styles.itemNext}>
                        <img src={item.img} />
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
            : ''
        }
      </div>
    )
  }
}
