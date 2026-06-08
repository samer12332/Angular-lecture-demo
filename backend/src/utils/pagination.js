function getPagination(query) {
  const page = Number.parseInt(query.page ?? '1', 10);
  const limit = Number.parseInt(query.limit ?? '10', 10);
  const skip = (page - 1) * limit;

  return {
    limit,
    page,
    skip,
  };
}

function buildPaginationMeta({ page, limit, totalItems }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    currentPage: page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

module.exports = {
  buildPaginationMeta,
  getPagination,
};
