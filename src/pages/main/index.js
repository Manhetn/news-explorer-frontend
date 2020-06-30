import './index.css';

import Page from '../../scripts/components/Page';

import Storage from '../../scripts/components/Storage';

import Header from '../../scripts/components/Header';
import HEADER_PARAMETERS from '../../scripts/constants/header';

import PopupLogin from '../../scripts/components/PopupLogin';
import POPUP_LOGIN_CONTENT from '../../scripts/constants/popup-login';

import PopupRegistration from '../../scripts/components/PopupRegistration';
import POPUP_REGISTRATION_CONTENT from '../../scripts/constants/popup-registration';

import PopupSuccess from '../../scripts/components/PopupSuccess';
import POPUP_SUCCESS_CONTENT from '../../scripts/constants/popup-success';

import POPUP_PARAMETERS from '../../scripts/constants/popup';

import Validation from '../../scripts/components/Validation';
import VALIDATION_PARAMETERS from '../../scripts/constants/validation-parameters';
import MESSAGES_ERROR_RU from '../../scripts/constants/messages-error';

import Search from '../../scripts/components/Search';
import SEARCH_PARAMETERS from '../../scripts/constants/search-parameters';

import Preloader from '../../scripts/components/Preloader';
import PRELOADER_PARAMETERS from '../../scripts/constants/preloader';

import NotFound from '../../scripts/components/NotFound';
import NOT_FOUND_PARAMETERS from '../../scripts/constants/notFound';

import Articles from '../../scripts/components/Articles';
import ARTICLES_LIST_PARAMETERS from '../../scripts/constants/articles';

import Article from '../../scripts/components/Article';
import ARTICLE_PARAMETERS from '../../scripts/constants/article';

import MainApi from '../../scripts/api/MainApi';
import MAIN_API_PARAMETERS from '../../scripts/constants/main-api';

import NewsApi from '../../scripts/api/NewsApi';
import NEWS_API_PARAMETERS from '../../scripts/constants/news-api';

// утилиты
import getDateAgo from '../../scripts/utils/getDateAgo';
import conversionDate from '../../scripts/utils/conversionDate';
import removeUnnecessaryTags from '../../scripts/utils/removeUnnecessaryTags';
import getDataFoundArticles from '../../scripts/utils/getDataFoundArticles'

// константы
import MONTHS from '../../scripts/constants/months';

const page = new Page('Main');
const storage = new Storage(sessionStorage);
const header = new Header(HEADER_PARAMETERS);
const popupLogin = new PopupLogin(POPUP_PARAMETERS, POPUP_LOGIN_CONTENT);
const popupRegistration = new PopupRegistration(POPUP_PARAMETERS, POPUP_REGISTRATION_CONTENT);
const popupSuccess = new PopupSuccess(POPUP_PARAMETERS, POPUP_SUCCESS_CONTENT);
const validation = new Validation(VALIDATION_PARAMETERS, MESSAGES_ERROR_RU)
const search = new Search(SEARCH_PARAMETERS);
const preloader = new Preloader(PRELOADER_PARAMETERS);
const notFound = new NotFound(NOT_FOUND_PARAMETERS);
const articles = new Articles(ARTICLES_LIST_PARAMETERS);
const article = new Article(ARTICLE_PARAMETERS);
const mainApi = new MainApi(MAIN_API_PARAMETERS);
const newsApi = new NewsApi(NEWS_API_PARAMETERS);

page.getDependencies({ header, search });
header.getDependencies({ page, storage, popupLogin, mainApi });
popupLogin.getDependencies({ header, storage, popupRegistration, validation, mainApi });
popupRegistration.getDependencies({ popupLogin, popupSuccess, validation, mainApi });
popupSuccess.getDependencies({ popupLogin });
search.getDependencies({ validation, newsApi, preloader, notFound, articles, storage });
articles.getDependencies({ article, storage, page });
article.getDependencies({
  storage,
  article,
  mainApi,
  MONTHS,
  getDataFoundArticles,
  conversionDate,
  removeUnnecessaryTags
});
newsApi.getDependencies({ getDateAgo });

page.fillPage();
