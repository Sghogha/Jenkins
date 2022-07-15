export const errorHandler = async (error) => {
  if (error.response) {
    return error.response;
  }
};
