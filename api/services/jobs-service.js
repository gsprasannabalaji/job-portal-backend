import Jobs from "../models/jobs.js";

export const create = async (req, res) => {
  const { title = "", description = "", applyLink = "", companyName = "", salary = "" } = req?.body;
  if (title == "" || description == "" || applyLink == "" || companyName == "", salary == "") {
    throw new Error(
        JSON.stringify({ status: 400, message: "required field is empty." })
    );
  }
  const job = new Jobs({
    title,
    description,
    applyLink,
    companyName,
    salary
  });
  await job?.save();
};

export const search = async (params, options) => {
    const jobs = await Jobs?.find(params, options)?.sort({ lastUpdated: -1 })?.exec();
    return jobs;
  };