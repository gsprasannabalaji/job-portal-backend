import * as jobsService from "../services/jobs-service.js";
import { setResponse, setError } from "../utilities/response-handler.js";

export const createJob = async (req, res) => {
  try {
    await jobsService?.create(req, res);

    return setResponse(
      {
        status: 201,
        result: { message: "Job created successfully" },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
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

export const getAllJobs = async (req, res) => {
  try {
    const result = await jobsService?.search({});
    setResponse({ status: 200, result }, res);
  } catch (error) {
    setError(
      { status: 500, message: error.message || "Internal Server Error" },
      res
    );
  }
};
