import { observable, action } from "mobx";

class ProductStore {
  @observable all = [1,2,3]
  @observable productId = ''

  @action setProduct = value => {
    this.productId = value
    console.log(this.productId)
  };
}

const productStore = new ProductStore();
export default productStore