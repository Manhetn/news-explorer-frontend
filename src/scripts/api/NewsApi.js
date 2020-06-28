import Api from './Api';

export default class NewsApi extends Api {
  constructor(parameters) {
    super(parameters)
    this.endpoint = parameters.endpoint;
    this.pageSize = parameters.pageSize;
    this.sortBy = parameters.sortBy;
    this.apiKey = parameters.apiKey;
  }

  getNews([keyword]) {
    const { getDateAgo } = this._dependencies;
    const weekAgo = getDateAgo(7);
    const today = getDateAgo(0);

    return fetch(
      `${this.url}` +
        `${this.endpoint}?` +
        `q=${keyword}&` +
        `from=${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}&` +
        `to=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}&` +
        `sortBy=${this.sortBy}&` +
        `pageSize=${this.pageSize}&` +
        `apiKey=${this.apiKey}`
    ).then(res => res.json());
  }
}
