import connectToDB from "@/lib/mongoose";
import SurveyResponse from "@/lib/models/surveyModels";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { surveyId, responses } = await req.json();
  await connectToDB();
  try {
    await SurveyResponse.create({
      surveyId,
      responses,
    });

    return NextResponse.json(
      { message: "Survey response saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save survey response" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDB();
  const survey = await SurveyResponse.find();
  return NextResponse.json({ survey });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectToDB();
  await SurveyResponse.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Survey Response Deleted" },
    { status: 200 }
  );
}
