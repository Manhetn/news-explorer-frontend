const MAIN_API_PARAMETERS = {
  url: `https://api.interesting-news.tk`,
  headers: {
    'Content-Type': 'application/json'
  },
  roots: {
    signup: `/signup`,
    signin: `/signin`,
    logout: `/logout`,
    getUser: `/users/me`,
    articles: `/articles`
  }
};

export default MAIN_API_PARAMETERS;
