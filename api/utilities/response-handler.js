export const setResponse = (data, response) => {
    response.status(data.status)
    return response.json(data.result);
  };
  
  export const setError = (err, response) => {
    response.status(err.status);
    return response.json({
      message: err.message,
    });
  };
  