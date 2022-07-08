export default class Storage {
  constructor(data) {
    this.data = data;
  }

  storedData() {
    localStorage.setItem('task', JSON.stringify(this.data));
  }

  static getData() {
    const receivedData = localStorage.getItem('task');
    if (receivedData) {
      return JSON.parse(receivedData);
    }
    return JSON.parse(receivedData);
  }
}
