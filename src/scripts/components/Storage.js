export default class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  getPropertyValue(key) {
    return this.storage.getItem(key)
  }

  setPropertyValue(key, value) {
    this.storage.setItem(key, value)
  }

  removeProperties(key){
    this.storage.removeItem(key)
  }

}
