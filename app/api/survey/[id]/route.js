import SurveyResponse from "@/lib/models/surveyModels";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { newResponse: responses } = await req.json();
  await connectToDB();
  await SurveyResponse.findByIdAndUpdate(id, { responses });
  return NextResponse.json({ message: "Survey Updated" }, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  await SurveyResponse.findOne({ _id: id });
  return NextResponse.json(
    { message: "Survey successfully get" },
    { status: 200 }
  );
}
