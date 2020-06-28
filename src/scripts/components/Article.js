import BaseComponent from './BaseComponent';

export default class Article extends BaseComponent {
  constructor(parameters){
    super(parameters);
  }

  // создаем найденную карточку страницы main
  createFoundArticle(article) {
    const { removeUnnecessaryTags, conversionDate, MONTHS, getDataFoundArticles } = this._dependencies;
    const { date, image, link, source, text, title, _id = '' } = getDataFoundArticles(article);
    return `<article class="article article_home-page id=${_id}">
              <div class="article__menu">
                <button
                  class="article__button article__button_bookmark"
                  type="button"
                >
                </button>
                <span class="article__tooltip article__tooltip_type_login">Войдите, чтобы сохранять статьи</span>
              </div>
              <a class="article__link"
                href="${link}"
                lang="ru"
                title="Ссылка на статью"
                target="_blank"
              >
                <img class="article__image" src="${this._checkImageUrl(image)}" alt="картинка как то связанная с статьей">
                <div class="article__information">
                  <time class="article__date" datetime="${conversionDate(date, MONTHS).dataDate}">${conversionDate(date, MONTHS).textDate}</time>
                  <h3 class="article__title">${title}</h3>
                  <p class="article__text">${removeUnnecessaryTags(text)}</p>
                </div>
                <p class="article__source">${source}</p>
              </a>
            </article>`;
  }

  createArticleSaved(article) {
    const { date, image, link, source, text, title, keyword, _id, } = article;
    const { conversionDate, MONTHS} = this._dependencies;
    return `<article class="article article_saved" id=${_id}>
              <div class="article__menu">
                <span class="article__keyword">${keyword}</span>
                <button
                  class="article__button article__button_delete"
                  type="button"
                >
                </button>
                <span class="article__tooltip article__tooltip_type_remove">Убрать из сохранённых</span>
                </div>
              <a class="article__link"
                href="${link}"
                lang="ru"
                title="Ссылка на статью"
                target="_blank"
              >
                <img class="article__image" src="${image}" alt="картинка как то связанная с статьей">
                <div class="article__information">
                <time class="article__date" datetime="${date}">${conversionDate(date, MONTHS).textDate}</time>
                <h3 class="article__title">${title}</h3>
                  <p class="article__text">${text}</p>
                </div>
                <p class="article__source">${source}</p>
              </a>
            </article>`;
  }

  // если у статьи нет картинки, ставим свою
  _checkImageUrl(url) {
    if(url === null) {
      url = `https://st6.cannypic.com/thumbs/14/140875_632_canny_pic.jpg`;
      return url;
    } else {
      return url;
    }
  }

  // сохраняем карточку на сервер
  saveArticle(event) {
    const { storage, mainApi } = this._dependencies;
    const userName = storage.getPropertyValue('userName')
    if (event.target.classList.contains(this.elements.buttonBookmark) && userName) {
      const keyWord = storage.getPropertyValue('keyword');
      const article = event.target.parentElement.parentElement;
      this.buttonSubmit = event.target;
      mainApi
        .saveArticleToServer(this._getArticleDate(article, keyWord))
        .then(res => {
          if (res.statusCode === '201') {
            this.buttonSubmit.classList.add(this.modifiers.buttonBookmarkBlue);
            this._disableButton(this.buttonSubmit);
          } else {
            throw new Error(res.message);
          }
        })
        .catch(err => console.log(err));
    }
  }

  // собираем данные карточки для сохранения на сервер
  _getArticleDate(article, keyword) {
    return {
      keyword,
      title: article.querySelector('.article__title').textContent.slice(0, 30),
      text: article.querySelector('.article__text').textContent.slice(0, 150),
      date: article.querySelector('.article__date').dateTime.slice(0, 30),
      source: article.querySelector('.article__source').textContent.slice(0, 150),
      link: article.querySelector('.article__link').href,
      image: article.querySelector('.article__image').src,
    }
  }

  // определяем нужно ли выводить сообщение про авторизацию
  determineStatusTooltip(event) {
    if (event.target.classList.contains(this.elements.buttonBookmark)) {
      const { storage } = this._dependencies;
      const userName = storage.getPropertyValue('userName');
      const tooltip = event.target.parentElement.querySelector(this.elements.articleTooltip);
      if (userName) {
        tooltip.classList.remove(this.modifiers.tooltipVisible);
      } else {
        tooltip.classList.add(this.modifiers.tooltipVisible);
      }
    }
  }

  // удаляем сообщение про авторизацию
  removeTooltip(event) {
    if (event.target.classList.contains(this.elements.buttonBookmark)) {
      const tooltip = event.target.parentElement.querySelector(this.elements.articleTooltip)
      tooltip.classList.remove(this.modifiers.tooltipVisible);
    }
  }

  deleteArticle(event) {
    const { storage, mainApi, information } = this._dependencies;
    const userName = storage.getPropertyValue('userName')
    if (event.target.classList.contains('article__button_delete') && userName) {
      const article = event.target.parentElement.parentElement;
      this.buttonSubmit = event.target;
      mainApi
        .deleteArticle(article.id)
        .then(res => {
          if (res.statusCode === '200') {
            article.parentNode.removeChild(article);
            information.changeKeywordContainer(article.id)
            information.fillInformation();
          } else {
            throw new Error(res.message);
          }
        })
        .catch(err => console.log(err));
    }
  }

}
