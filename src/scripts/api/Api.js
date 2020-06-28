export default class Api {
  constructor(parameters) {
    this.url = parameters.url;
    this.headers = parameters.headers;
    this.roots = parameters.roots;
  }

  getDependencies(dependencies) {
    this._dependencies = dependencies;
  }



}
