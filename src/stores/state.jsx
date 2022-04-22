import { observable, action } from "mobx";

class StateStore {
  @observable tableId = ''
  @observable isTried = false
  @observable promoterDrawer = false
  @observable flowPermission1 = {}
  @observable approverDrawer = false
  @observable approverConfig1 = {}
  @observable copyerDrawer = false
  @observable copyerConfig1 = {}
  @observable conditionDrawer = false

  @action setTableId = value => {
    this.tableId = value
  }
  @action setIsTried = value => {
    this.isTried = value
  }
  @action setPromoter = value => {
    this.promoterDrawer = value
  }
  @action setFlowPermission = value => {
    this.flowPermission1 = value
  }
  @action setApprover = value => {
    this.approverDrawer = value
  }
  @action setApproverConfig = value => {
    this.approverConfig1 = value
  }
  @action setCopyer = value => {
    this.copyerDrawer = value
  }
  @action setCopyerConfig = value => {
    this.copyerConfig1 = value
  }
  @action setCondition = value => {
    this.conditionDrawer = value
  }
}

const stateStore = new StateStore()
export default stateStore