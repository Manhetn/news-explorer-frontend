const conversionDate = (date, months) => {
  const dataDate = date.match(/(\d{4})-(\d{2})-(\d{2})/);
  const textDate = `${dataDate[3]} ${months[+dataDate[2] - 1]}, ${dataDate[1]}г.`;
  return {
    dataDate: dataDate[0],
    textDate
  };
};

export default conversionDate;
