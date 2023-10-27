import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const surveySchema = new mongoose.Schema(
  {
    uuid: { unique: true, type: String },
    surveyId: String,
    responses: Object,
  },
  { timestamps: true }
);

const SurveyResponse =
  mongoose.models.SurveyResponse ||
  mongoose.model("SurveyResponse", surveySchema);

export default SurveyResponse;
