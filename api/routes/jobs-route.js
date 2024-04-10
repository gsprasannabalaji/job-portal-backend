import express from "express";

import * as jobsController from "../controllers/jobs-controller.js";

const router = express.Router();

router?.route("/job").post(jobsController?.createJob);

router?.route("/jobs").get(jobsController?.getAllJobs);

export default router;
