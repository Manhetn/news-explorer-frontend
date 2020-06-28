import './index.css';

import Storage from '../../scripts/components/Storage';

import Header from '../../scripts/components/Header';
import HEADER_PARAMETERS from '../../scripts/constants/header';

import MainApi from '../../scripts/api/MainApi';
import MAIN_API_PARAMETERS from '../../scripts/constants/main-api';

import Preloader from '../../scripts/components/Preloader';
import PRELOADER_PARAMETERS from '../../scripts/constants/preloader';

import Articles from '../../scripts/components/Articles';
import ARTICLES_LIST_PARAMETERS from '../../scripts/constants/articles';

import Article from '../../scripts/components/Article';
import ARTICLE_PARAMETERS from '../../scripts/constants/article';

import Information from '../../scripts/components/Information';
import INFORMATION_PARAMETERS from '../../scripts/constants/information';

import Page from '../../scripts/components/Page';

import backToTheMainPage from '../../scripts/utils/backToTheMainPage';
import conversionDate from '../../scripts/utils/conversionDate';
import MONTHS from '../../scripts/constants/months';

const page = new Page('Articles');
const information = new Information(INFORMATION_PARAMETERS);
const storage = new Storage(sessionStorage);
const header = new Header(HEADER_PARAMETERS);
const mainApi = new MainApi(MAIN_API_PARAMETERS);
const preloader = new Preloader(PRELOADER_PARAMETERS);
const articles = new Articles(ARTICLES_LIST_PARAMETERS);
const article = new Article(ARTICLE_PARAMETERS);

header.getDependencies({ page, storage, mainApi, backToTheMainPage });
article.getDependencies({ storage, mainApi, MONTHS, information, conversionDate, articles });
articles.getDependencies({ article, storage, mainApi, page, information, preloader });
page.getDependencies({ storage, header, article, articles });
information.getDependencies({ storage, articles });

page.fillPage();
