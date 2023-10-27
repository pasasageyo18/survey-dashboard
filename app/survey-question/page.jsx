"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { surveyQuestionJson } from "@/constants/survey";

function SurveyComponent() {
  const router = useRouter();

  const survey = useMemo(() => {
    return new Model(surveyQuestionJson);
  }, []);

  useEffect(() => {
    survey.onComplete.add(async (sender, options) => {
      options.showSaveInProgress();
      const surveyId = "6c091611-9da5-44ef-99a2-b750c431908b"; // Replace with a unique identifier
      const responses = sender.data;
      try {
        const response = await fetch("http://localhost:3000/api/survey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ surveyId, responses }),
        });
        if (response.status === 201) {
          const data = await response.json();
          options.showSaveSuccess();
          router.push("/surveys");
        } else {
          options.showSaveError();
          console.error("Failed to save survey response.");
        }
      } catch (error) {
        options.showSaveError();
        console.error(error);
      }
    });
  }, []);

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyComponent;
