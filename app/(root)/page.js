"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recTotal, setRecTotal] = useState([]);
  const [rateTotal, setRateTotal] = useState([]);
  const [favTotal, setFavTotal] = useState([]);

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
        const rate = arrAnswer.map((rating) => rating.serviceRate);
        const recommended = arrAnswer.map((rec) => rec.recommend);
        const favorite = arrAnswer.map((fav) => fav.favoriteBeverage);

        const rateOne = rate.filter((rating) => rating == 1).length;
        const rateTwo = rate.filter((rating) => rating == 2).length;
        const rateThree = rate.filter((rating) => rating == 3).length;
        const rateFour = rate.filter((rating) => rating == 4).length;
        const rateFive = rate.filter((rating) => rating == 5).length;
        setRateTotal([rateOne, rateTwo, rateThree, rateFour, rateFive]);

        const yesRec = recommended.filter(
          (res) => res === true || res === "true"
        ).length;
        const noRec = recommended.filter(
          (res) => res === false || res === "false"
        ).length;
        setRecTotal([yesRec, noRec]);

        const isMatcha = favorite.filter(
          (filter) => filter === "Matcha Latte"
        ).length;

        const isMocca = favorite.filter(
          (filter) => filter === "Moccacino"
        ).length;

        const isThai = favorite.filter(
          (filter) => filter === "Thai Tea"
        ).length;

        const isCoffee = favorite.filter(
          (filter) => filter === "Coffee Milk"
        ).length;
        setFavTotal([isMatcha, isMocca, isThai, isCoffee]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    dataFetch();
  }, []);

  const optionRate = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5],
    },
    theme: {
      mode: "light",
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  const optionRec = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: ["Yes", "No"],
    },
    theme: {
      mode: "light",
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };
  const optionFav = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: ["Matcha Latte", "Moccachino", "Thai Tea", "Coffee Milk"],
    },
    theme: {
      mode: "light",
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  const seriesRate = [
    {
      name: "series-1",
      data: rateTotal,
    },
  ];
  const seriesRec = [
    {
      name: "series-1",
      data: recTotal,
    },
  ];
  const seriesFav = [
    {
      name: "series-1",
      data: favTotal,
    },
  ];

  return (
    <div className="w-auto">
      <div className="mb-10">
        <Link href={"/"} className="font-medium text-zinc-500">
          Dashboard
        </Link>
      </div>
      <h1 className="text-4xl text-white mb-7">Dashboard</h1>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
        <div className="p-5 rounded-md shadow-[0px_6px_16px_2px_#4d4d4d]">
          <p className="text-xl">Service Rate</p>
          <Chart
            type="bar"
            options={optionRate}
            series={seriesRate}
            height={200}
            width={`100%`}
          />
        </div>
        <div className="p-5 rounded-md shadow-[0px_6px_16px_2px_#4d4d4d]">
          <p className="text-xl">Recommend</p>
          <Chart
            type="bar"
            options={optionRec}
            series={seriesRec}
            height={200}
            width={`100%`}
          />
        </div>
        <div className="p-5 rounded-md shadow-[0px_6px_16px_2px_#4d4d4d]">
          <p className="text-xl">Favorite Beverages</p>
          <Chart
            type="bar"
            options={optionFav}
            series={seriesFav}
            height={200}
            width={`100%`}
          />
        </div>
      </div>
    </div>
  );
}
