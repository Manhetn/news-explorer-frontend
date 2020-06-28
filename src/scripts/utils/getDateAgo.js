const getDateAgo = (num) => {
  return new Date(Date.now() - 24 * 3600 * 1000 * num);
}

export default getDateAgo;
