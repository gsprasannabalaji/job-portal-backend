import mongoose from "mongoose";

const { Schema, model } = mongoose;

const jobsSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applyLink: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    salary: {
        type: Number,
        required: true,
    }
  },
  { collection: "jobs", versionKey: false }
);

const Jobs = model("Jobs", jobsSchema);

export default Jobs;
