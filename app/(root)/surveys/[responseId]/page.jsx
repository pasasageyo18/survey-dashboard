"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [specificAnswer, setSpecificAnswer] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const dataFetch = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/survey");
        const surveys = await res.json();
        const { survey } = surveys;
        let arrAnswer = [];
        let obj = {};

        for (const { responses, _id } of survey) {
          obj = { ...responses, _id };
          arrAnswer = [...arrAnswer, obj];
        }

        const answerRes = await arrAnswer.find(
          (answer) => answer._id === params.responseId
        );

        setSpecificAnswer(answerRes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    dataFetch();
  }, [params.responseId]);

  const handleRouteButton = (id) => {
    router.push(`/surveys/${id}/edit`);
  };

  return (
    <div className="w-auto px-16 max-md:px-5">
      {!isLoading ? (
        <>
          <div className="mb-10 flex">
            <Link href={"/surveys"} className="font-medium text-zinc-500 mr-4">
              Surveys
            </Link>
            <p className="mr-4 text-zinc-500">&gt;</p>
            <Link
              href={`/surveys/${params.surveyId}`}
              className="font-medium text-zinc-500"
            >
              Detail
            </Link>
          </div>
          <div className="flex w-full justify-between">
            <h1 className="text-4xl text-white mb-7">Detail Survey</h1>
            <Button
              color="primary"
              onClick={() => handleRouteButton(specificAnswer?._id)}
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-2 w-full gap-5">
            <div className="mb-12">
              <p className="font-semibold text-white text-2xl mb-3">Name</p>
              <p>{specificAnswer?.name}</p>
            </div>
            <div>
              <p className="font-semibold text-white text-2xl mb-3">Email</p>
              <p>{specificAnswer?.email}</p>
            </div>
            <div>
              <p className="font-semibold text-white text-2xl mb-3">
                Information
              </p>
              <p>{specificAnswer?.whereInfo}</p>
            </div>
            <div>
              <p className="font-semibold text-white text-2xl mb-3">Often</p>
              <p>{specificAnswer?.howOften}</p>
            </div>
            <div className="mb-12">
              <p className="font-semibold text-white text-2xl mb-3">
                Favorite Beverage
              </p>
              <p>{specificAnswer?.favoriteBeverage}</p>
            </div>
            {specificAnswer?.reason && (
              <div className="mb-12">
                <p className="font-semibold text-white text-2xl mb-3">
                  Favorite Reason
                </p>
                <p>{specificAnswer?.reason}</p>
              </div>
            )}
            <div className="mb-8">
              <p className="font-semibold text-white text-2xl mb-3">
                Recommend
              </p>
              <p>{specificAnswer?.recommend === true ? "Yes" : "No"}</p>
            </div>
            <div className="mb-8">
              <p className="font-semibold text-white text-2xl mb-3">Interior</p>
              <p>{specificAnswer?.interior}</p>
            </div>
            {specificAnswer?.badReason && (
              <div>
                <p className="font-semibold text-white text-2xl mb-3">
                  Bad Interior Reason
                </p>
                <p>{specificAnswer?.badReason}</p>
              </div>
            )}
            <div>
              <p className="font-semibold text-white text-2xl mb-3">Service</p>
              <p>{specificAnswer?.serviceRate}</p>
            </div>
            {specificAnswer?.review && (
              <div>
                <p className="font-semibold text-white text-2xl mb-3">Review</p>
                <p>{specificAnswer?.review}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
