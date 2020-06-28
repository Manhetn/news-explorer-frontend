import BaseComponent from './BaseComponent';

export default class Search extends BaseComponent {
  constructor(parameters) {
    super(parameters);
  }

  enable() {
    this._getElementsForm();
    this._setListeners();
  }

   // получаем элементы поисковика
  _getElementsForm() {
    this.form = this.block.querySelector(this.elements.form);
    this.inputWord = this.block.querySelector(this.elements.inputWord);
    this.buttonSubmit = this.block.querySelector(this.elements.buttonSubmit);
  }

  _setListeners() {

    const { validation } = this._dependencies;

    this._setHandlers([
        { element: this.form, event: 'input', handler: validation.checkFormSearch.bind(validation) },
        { element: this.buttonSubmit, event: 'click', handler: this._submit.bind(this) },
      ]);
  }

  _submit(event) {
    event.preventDefault();

    const { storage, preloader, notFound, articles, newsApi } = this._dependencies;

    this._disableInputs([this.inputWord]);
    this._disableButton(this.buttonSubmit);

    // если новый запрос, удаляяем старые статьи и слово из sessionStorage
    if (storage.storage.length > 0) {
      storage.removeProperties('keyword');
      storage.removeProperties('articles');
    }

    notFound.close();
    articles.close();
    preloader.open();

    newsApi
      .getNews([this.inputWord.value])
      .then(res => {
        if (res.status === 'ok' && res.totalResults > 0) {
          storage.setPropertyValue('keyword', this.inputWord.value);
          storage.setPropertyValue('articles', JSON.stringify(res.articles));
          articles.open();
          articles.renderFoundArticles();
        } else if (res.status === 'ok' && res.totalResults === 0) {
          notFound.open();
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err)
        console.log('НАДО ДОПИЛИТЬ!!!!!!!')
        //  НАДО ДОПИЛИТЬ!!!!!!!
      })
      .finally(() => {
        preloader.close();
        this._activateInputs([this.inputWord]);
        this._activateButton(this.buttonSubmit);
      });
  }

}
