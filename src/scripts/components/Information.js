import BaseComponent from "./BaseComponent";

export default class Information extends BaseComponent {
  constructor(parameters) {
    super(parameters)
  }

  fillInformation() {
    this.getInformationUser();
    this.getKeyWord();
  }

  getInformationUser() {
    const {informationText} = this.elements;
    informationText.textContent = '';
    let informationString;
    const couter = this._articleCounter()
    if (couter === 0) {
      informationString = `<span class="information__name-user">${this._getNameUser()} </span>, у вас <span class="information__article-counter">${couter}</span> сохранённых статей`;
    } else if (couter === 1) {
      informationString = `<span class="information__name-user">${this._getNameUser()} </span>, у вас <span class="information__article-counter">${couter}</span> сохранённая статья`;
    } else if (couter < 5) {
      informationString = `<span class="information__name-user">${this._getNameUser()} </span>, у вас <span class="information__article-counter">${couter}</span> сохранённые статьи`;
    } else {
      informationString = `<span class="information__name-user">${this._getNameUser()} </span>, у вас <span class="information__article-counter">${couter}</span> сохранённых статей`;
    }
    informationText.insertAdjacentHTML('beforeend', informationString);
  }

  // счетчик статей
  changeKeywordContainer(id) {
    const { storage } = this._dependencies;
    const savedArticle = JSON.parse(storage.getPropertyValue('savedArticles'));
    const newArrayArticles = [];
    savedArticle.forEach(article => {
      if (article._id !== id){
        newArrayArticles.push(article);
      }
    })
    storage.removeProperties('savedArticles');
    storage.setPropertyValue('savedArticles', JSON.stringify(newArrayArticles));
  }

  getKeyWord() {
    const articles = this._countKeywords();
    const { informationDetals } = this.elements;
    let resultString;
    if (articles.length > 4) {
      resultString = `<p class="information__detals">
                        По ключевым словам:
                        <strong class="information__keyword">${articles[0][0]}, ${articles[1][0]}, ${articles[2][0]}</strong> и
                        <strong class="information__counter">${articles.length - 3}</strong>
                        <strong class="information__other">другим</strong>
                      </p>`;
    } else if (articles.length === 4) {
      resultString = `По ключевым словам: <strong class="information__keyword">${articles[0][0]}, ${articles[1][0]}, ${articles[2][0]}</strong> и <strong class="information__counter">${articles.length - 3}</strong><strong class="information__other"> другому</strong>`;
    } else if (articles.length === 3) {
      resultString = `По ключевым словам: <strong class="information__keyword">${articles[0][0]}, ${articles[1][0]}, ${articles[2][0]}</strong>`;
    } else if (articles.length === 2) {
      resultString = `По ключевым словам: <strong class="information__keyword">${articles[0][0]}, ${articles[1][0]}</strong>`;
    } else if (articles.length === 1) {
      resultString = `По ключевым словам: <strong class="information__keyword">${articles[0][0]}</strong>`;
    } else {
      esultString = '';
    }
    informationDetals.textContent = '';
    informationDetals.insertAdjacentHTML('beforeend', resultString);
  }

  _getNameUser() {
    const { storage } = this._dependencies;
    return storage.getPropertyValue('userName')
  }

  _articleCounter() {
    const { storage } = this._dependencies;
    return JSON.parse(storage.getPropertyValue('savedArticles')).length;
  }

  _countKeywords() {
    const { storage } = this._dependencies;
    const articles = JSON.parse(storage.getPropertyValue('savedArticles'));
    const keywords = {};
    articles.forEach(article => {
      if (keywords[article.keyword]) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });
    return Object.entries(keywords).sort((a, b) => b[1] - a[1]);
  }

}
