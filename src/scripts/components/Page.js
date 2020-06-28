export default class Page {
  constructor(page) {
    this.namePage = page;
  }

  fillPage(){
    // console.log(this.namePage);
    if (this.namePage === 'Main') {
      this._fillMainPage();
    } else if (this.namePage === 'Articles') {
      this._fillArticlePage();
    }
  }

  _fillArticlePage() {
    const { header, articles } = this._dependencies;
    header.fillHeader();
    articles.open();
    articles.getSavedArticles();
  }

  _fillMainPage() {
    const { header, search } = this._dependencies
    header.fillHeader();
    search.enable();
  }

  getDependencies(dependencies) {
    this._dependencies = dependencies;
  }

}
