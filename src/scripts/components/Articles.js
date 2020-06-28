import BaseComponent from './BaseComponent';

export default class Articles extends BaseComponent {
  constructor(parameters){
    super(parameters);
    this.open = this.open.bind(this)
  }

  open(){
    const { page } = this._dependencies;
    if (page.namePage === 'Articles') {
      this._getElements();
      this._setListeners();
    } else if (page.namePage === 'Main') {
      // если ищем слово впервые то получаем элементы
      if (!this.articlesList && !this.buttonShowMore) {
        this._getElements();
        this._setListeners();
      }
      this._open();
    }
  }

  close() {
    // если блок с статьями открыт то закрываем
    if (this.block.classList.contains(this.modifiers.isOpen)){
      this._close();
      this._clearArticlesList();
    }
  }

  // рендерим найденные статьи
  renderFoundArticles() {
    const { storage } = this._dependencies;
    const articlesArray = JSON.parse(storage.getPropertyValue('articles'));
    const threeArticles = articlesArray.splice(0, 3);
    storage.setPropertyValue('articles', JSON.stringify(articlesArray));
    threeArticles.forEach(articleData => {
      this._addArticle(articleData);
    });
    this._stateButtonShowMore();
  }

  // рендерим сохраненные статьи
  renderSavedArticles() {
    const { storage, information } = this._dependencies;
    const articlesArray = JSON.parse(storage.getPropertyValue('savedArticles'));
    articlesArray.forEach(articleData => {
      this._addArticle(articleData);
    });
    information.fillInformation();
  }

  // добавляем статьи
  _addArticle(articleData) {
    const { page } = this._dependencies;
    const { article } = this._dependencies;
    if (page.namePage === 'Articles') {
      this.articlesList.insertAdjacentHTML("beforeend", article.createArticleSaved(articleData));
    } else if (page.namePage === 'Main') {
      this.articlesList.insertAdjacentHTML("beforeend", article.createFoundArticle(articleData));
    }
  }

  _getElements() {
    const { page } = this._dependencies;
    this.articlesList = this.elements.articlesList;
    if (page.namePage === 'Main') {
      this.buttonShowMore = this.elements.buttonShowMore;
    }
  }

  _setListeners() {
    const { article, page } = this._dependencies;
    if (page.namePage === 'Main') {
      this._setHandlers([
        { element: this.buttonShowMore, event: 'click', handler: this.renderFoundArticles.bind(this) },
        { element: this.articlesList, event: 'click', handler: article.saveArticle.bind(article) },
        { element: this.articlesList, event: 'mouseover', handler: article.determineStatusTooltip.bind(article) },
        { element: this.articlesList, event: 'mouseout', handler: article.removeTooltip.bind(article) }
      ]);
    } else if (page.namePage === 'Articles'){
      this._setHandlers([
        { element: this.articlesList, event: 'click', handler: article.deleteArticle.bind(article) },
      ]);
    }
  }

  // очищаем лист с статьями
  _clearArticlesList() {
    while (this.articlesList.lastChild) {
      this.articlesList.removeChild(this.articlesList.lastChild);
    }
  }

  // определяем должна ли быть кномпа ShowMore
  _stateButtonShowMore() {
    const { storage } = this._dependencies;
    const articles = JSON.parse(storage.getPropertyValue('articles'));
    if (articles.length === 0) {
      this.buttonShowMore.style.display = 'none';
    } else {
      this.buttonShowMore.style.display = 'block';
    }
  }

  getSavedArticles() {
    // const { mainApi, storage, information, preloader } = this._dependencies;
    const { mainApi, storage, information, preloader } = this._dependencies;
    preloader.open();
    mainApi
      .getArticles()
      .then(res => {
        if (res.statusCode === "200" && res.articles.length !== 0) {
          storage.setPropertyValue('savedArticles', JSON.stringify(res.articles));
          this.renderSavedArticles();
          information.fillInformation();
        } else if (res.articles.length === 0) {
          information.fillInformation();
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        preloader.close();
      });
  }

}
