export interface IPagination {
  skip: number,
  limit: number,
  sort: object,
}

export const getPaginationObject = (pageLimit: number, pageNumber: number, sortBy: string, direction: string): IPagination => {
  const offset = pageLimit * (pageNumber - 1);
  const sortObject = {
    [sortBy]: direction === 'desc' ? -1 : 0
  };

  return {
    skip: offset,
    limit: pageLimit,
    sort: sortObject
  }
}
