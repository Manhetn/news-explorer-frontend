const removeUnnecessaryTags = (articleText) => articleText.replace(/(<ol>|<\/ol>|<li>|<\/li>)/g, '');

export default removeUnnecessaryTags;
