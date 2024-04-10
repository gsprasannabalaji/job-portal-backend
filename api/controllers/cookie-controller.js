import * as cookieService from "../services/cookie-service.js";
import { setResponse, setError } from "../utilities/response-handler.js";

export const checkIsAdminCookie = async (req, res) => {
  try {
    const isAdmin = cookieService?.isAdminCookie(req?.userRole);
    setResponse({ status: 200, result: isAdmin }, res);
  } catch (err) {
    setError(
      { status: 500, message: error.message || "Internal Server Error" },
      res
    );
  }
};