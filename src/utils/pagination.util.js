const paginationUtil = ({ limit = 30, page = 1 }) => {
  if (limit > 30) {
    limit = 30;
  }
  const newLimit = limit;
  const skip = (page - 1) * limit;

  return {
    newLimit,
    skip,
  };
};

export default paginationUtil;
