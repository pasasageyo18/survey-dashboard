"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import Link from "next/link";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(null);

  const router = useRouter();

  function viewSpecificUserHandler(id) {
    router.push(`/surveys/${id}`);
  }

  const handleRouteEditButton = (id) => {
    router.push(`/surveys/${id}/edit`);
  };
  const handleRouteSurveyButton = (id) => {
    router.push(`/survey-question`);
  };

  const handleDeleteButton = async (id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/survey?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) window.location.reload();
    }
  };

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
          setAnswers(arrAnswer);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    dataFetch();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="mb-10 flex">
            <Link href={"/surveys"} className="font-medium text-zinc-500 mr-4">
              Surveys
            </Link>
          </div>
          <div className="flex w-full justify-between">
            <h1 className="text-4xl text-white mb-7">Detail Survey</h1>
            <Button
              color="primary"
              className="mb-10"
              onClick={() => handleRouteSurveyButton()}
            >
              Add Survey
            </Button>
          </div>
          {answers ? (
            <Table aria-label="Example table with custom cells">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>RATE</TableColumn>
                <TableColumn>FAVORITE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {answers &&
                  answers.length > 0 &&
                  answers.map((response, index) => (
                    <TableRow key={index} className="mb-7">
                      <TableCell>
                        <p className="text-lg">{index + 1}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-lg">{response.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-lg">{response.serviceRate}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-lg">{response.favoriteBeverage}</p>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-2">
                          <Tooltip content="Details">
                            <span
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                              onClick={() =>
                                viewSpecificUserHandler(response._id)
                              }
                            >
                              <EyeIcon />
                            </span>
                          </Tooltip>
                          <Tooltip content="Edit user">
                            <span
                              className="text-lg text-default-400 cursor-pointer active:opacity-50"
                              onClick={() =>
                                handleRouteEditButton(response._id)
                              }
                            >
                              <EditIcon />
                            </span>
                          </Tooltip>
                          <Tooltip color="danger" content="Delete user">
                            <span
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                              onClick={() => handleDeleteButton(response._id)}
                            >
                              <DeleteIcon />
                            </span>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-4xl">No Data</p>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

//
