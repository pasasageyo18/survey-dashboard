"use client";

import { Button } from "@nextui-org/react";
import {
  ButtonRadioGroup,
  InputText,
  SelectGroup,
  TextAreaGroup,
} from "@/components/InputGroup";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whereInfo, setWhereInfo] = useState("");
  const [howOften, setHowOften] = useState("");
  const [favoriteBeverage, setFavoriteBeverage] = useState("");
  const [reason, setReason] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [interior, setInterior] = useState("");
  const [badReason, setBadReason] = useState("");
  const [review, setReview] = useState("");
  const [serviceRate, setServiceRate] = useState(null);

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

        setId(answerRes._id);
        setName(answerRes.name);
        setEmail(answerRes.email);
        setWhereInfo(answerRes.whereInfo);
        setHowOften(answerRes.howOften);
        setFavoriteBeverage(answerRes.favoriteBeverage);
        setReason(answerRes.reason);
        setRecommend(answerRes.recommend);
        setInterior(answerRes.interior);
        setBadReason(answerRes.badReason);
        setServiceRate(answerRes.serviceRate);
        setReview(answerRes.review);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    dataFetch();
  }, [params.responseId]);

  const handleRouteViewButton = (id) => {
    router.push(`/surveys/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      newResponse: {
        name,
        email,
        whereInfo,
        howOften,
        favoriteBeverage,
        reason,
        recommend,
        interior,
        badReason,
        serviceRate: Number(serviceRate),
        review,
      },
    });
    try {
      const res = await fetch(`http://localhost:3000/api/survey/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: body,
      });

      if (!res.ok) {
        throw new Error("Cant update the data");
      }

      router.push(`/surveys/${id}`);
    } catch (error) {
      console.error(error);
    }
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
              href={`/surveys/${params.responseId}/edit`}
              className="font-medium text-zinc-500"
            >
              Edit
            </Link>
          </div>
          <div className="flex w-full justify-between mb-10">
            <h1 className="text-4xl text-white ">Edit Survey</h1>
            <Button color="primary" onClick={() => handleRouteViewButton(id)}>
              View
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputText
                name="name"
                labelText="Name"
                type="text"
                value={name}
                onChange={setName}
              />
              <InputText
                name="email"
                labelText="Email"
                type="email"
                value={email}
                onChange={setEmail}
              />

              <SelectGroup
                labelText="Where Info"
                name="whereInfo"
                defaultValue={whereInfo}
                onChange={setWhereInfo}
              />
              <SelectGroup
                labelText="How Often"
                name="howOften"
                defaultValue={howOften}
                onChange={setHowOften}
              />
              <SelectGroup
                labelText="Favorite Beverage"
                name="favoriteBeverage"
                defaultValue={favoriteBeverage}
                onChange={setFavoriteBeverage}
              />
              <TextAreaGroup
                labelText="Favorite Reason"
                name="reason"
                value={reason}
                onChange={setReason}
              />
              <SelectGroup
                labelText="Recommend"
                name="recommend"
                onChange={setRecommend}
                defaultValue={recommend}
              />
              <SelectGroup
                labelText="Interior Design"
                name="interior"
                defaultValue={interior}
                onChange={setInterior}
              />
              <TextAreaGroup
                labelText="Bad Reason"
                name="badReason"
                value={badReason}
                onChange={setBadReason}
              />
              <InputText
                name="serviceRate"
                labelText="Service rate"
                type="number"
                value={serviceRate}
                onChange={setServiceRate}
              />
              <TextAreaGroup
                labelText="Review"
                name="review"
                value={review}
                onChange={setReview}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
