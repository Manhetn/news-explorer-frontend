import Api from './Api';

export default class MainApi extends Api {
  constructor(parameters) {
    super(parameters);
  }

  signup(userData) {
    return fetch(`${this.url}${this.roots.signup}`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(userData)
    }).then(res => res.json());
  }

  signin(userData) {
    return fetch(`${this.url}${this.roots.signin}`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(userData)
    })
    .then(res => res.json());
  }

  getUser() {
    return fetch(`${this.url}${this.roots.getUser}`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
    .then(res => res.json());
  }

  logout() {
    return fetch(`${this.url}${this.roots.logout}`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
    .then(res => res.json());
  }

  saveArticleToServer(articleDate) {
    return fetch(`${this.url}${this.roots.articles}`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(articleDate)
    }).then(res => res.json());
  }

  getArticles() {
    return fetch(`${this.url}${this.roots.articles}`, {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json());
  }

  deleteArticle(articleId) {
    return fetch(`${this.url}${this.roots.articles}/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    }).then(res => res.json());
  }

}
