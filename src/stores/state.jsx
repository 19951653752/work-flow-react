import { observable, action } from "mobx";

class StateStore {
  @observable defaultDrawer = true
  @observable reviewerDrawer = false
  @observable conditionDrawer = false

  @action setDefault = value => {
    this.defaultDrawer = value
  }
  @action setReviewer = value => {
    this.reviewerDrawer = value
  }
  @action setCondition = value => {
    this.conditionDrawer = value
  }
}

const stateStore = new StateStore()
export default stateStore