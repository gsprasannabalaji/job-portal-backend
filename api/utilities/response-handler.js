export const setResponse = (data, response) => {
    response.status(data.status)
    return response.json(data.result);
  };
  
  export const setError = (err, response) => {
    response.status(err.status);
    let responseObj = {
      message: err.message,
    }
    if(err["isUserValid"]!= undefined) {
      responseObj.isUserValid= err?.isUserValid;
    }
    return response.json(responseObj);
  };
  