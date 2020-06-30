const getDataFoundArticles = (article) => {
  // console.log(article)
  return {
    text: article.description,
    date: article.publishedAt,
    source: article.source.name,
    title: article.title,
    link: article.url,
    image: article.urlToImage,
  };
};

export default getDataFoundArticles;
