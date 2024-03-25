import * as userDetailsService from "../services/user-details-service.js";
import { setResponse, setError } from "../utilities/response-handler.js";

export const getUser = async (req, res) => {
  try {
    const result = await userDetailsService.search({}, { images: 0 });
    setResponse({ status: 200, result }, res);
  } catch (error) {
    setError(
      { status: 500, message: error.message || "Internal Server Error" },
      res
    );
  }
};

export const createUser = async (req, res) => {
  try {
    await userDetailsService.create(req, res);

    return setResponse(
      {
        status: 201,
        result: { message: "User created successfully" },
      },
      res
    );
  } catch (error) {
    if(typeof {} == 'object') {
        const parsedError = JSON.parse(error.message);
        setError(
          { status: parsedError.status, message: parsedError.message },
          res
        );
    } else {
        setError(
            { status: 500, message: error.message || "Internal Server Error" },
            res
          );
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    await userDetailsService.update(req, res);
    return setResponse(
      {
        status: 200,
        result: { message: "User updated successfully" },
      },
      res
    );
  } catch (error) {
    if(typeof {} == 'object') {
        const parsedError = JSON.parse(error.message);
        setError(
          { status: parsedError.status, message: parsedError.message },
          res
        );
    } else {
        setError(
            { status: 500, message: error.message || "Internal Server Error" },
            res
          );
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userDetailsService.remove(req, res);
    return setResponse(
      {
        status: 200,
        result: { message: "User deleted successfully" },
      },
      res
    );
  } catch (error) {
    if(typeof {} == 'object') {
        const parsedError = JSON.parse(error.message);
        setError(
          { status: parsedError.status, message: parsedError.message },
          res
        );
    } else {
        setError(
            { status: 500, message: error.message || "Internal Server Error" },
            res
          );
    }
  }
};

export const uploadImage = async (req, res) => {
  try {
    const filePath = await userDetailsService.uploadImage(req, res);
    setResponse(
      {
        status: 200,
        result: {
          message: "Image uploaded successfully",
          imagePath: filePath,
        },
      },
      res
    );
  } catch (error) {
    if(typeof {} == 'object') {
        const parsedError = JSON.parse(error.message);
        setError(
          { status: parsedError.status, message: parsedError.message },
          res
        );
    } else {
        setError(
            { status: 500, message: error.message || "Internal Server Error" },
            res
          );
    }
  }
};

export const getImage = async (req, res) => {
  try {
    const images = await userDetailsService.getImage(req, res);
    setResponse(
      {
        status: 200,
        result: images,
      },
      res
    );
  } catch (error) {
    if(typeof {} == 'object') {
        const parsedError = JSON.parse(error.message);
        setError(
          { status: parsedError.status, message: parsedError.message },
          res
        );
    } else {
        setError(
            { status: 500, message: error.message || "Internal Server Error" },
            res
          );
    }
  }
};
