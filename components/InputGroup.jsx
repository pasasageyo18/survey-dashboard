import React from "react";

const optionWhereInfo = [
  "Found it on Instagram",
  "Referred by a friend",
  "See the ads",
  "Randomly",
];
const optionsOften = ["Once", "Around 2-4 days", "Around 5-7 days", "Everyday"];
const optionFavoriteBeverage = [
  "Matcha Latte",
  "Coffee Milk",
  "Thai Tea",
  "Moccacino",
];
const optionBoolean = [true, false];
const optionInterior = ["It's super cool!", "Nothing special...", "Bad"];

export function InputText({
  name,
  labelText,
  type,
  value,
  onChange,
  required,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required ? true : false}
      />
    </div>
  );
}

export function SelectGroup({ labelText, name, defaultValue, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled hidden>
          Select an option
        </option>
        {name === "whereInfo" &&
          optionWhereInfo.map((info, index) => (
            <option key={index} value={info}>
              {info}
            </option>
          ))}
        {name === "favoriteBeverage" &&
          optionFavoriteBeverage.map((info, index) => (
            <option key={index} value={info}>
              {info}
            </option>
          ))}
        {name === "howOften" &&
          optionsOften.map((info, index) => (
            <option key={index} value={info}>
              {info}
            </option>
          ))}
        {name === "interior" &&
          optionInterior.map((info, index) => (
            <option key={index} value={info}>
              {info}
            </option>
          ))}
        {name === "recommend" &&
          optionBoolean.map((info, index) => (
            <option key={index} value={info}>
              {info ? "Yes" : "No"}
            </option>
          ))}
      </select>
    </div>
  );
}

export function ButtonRadioGroup({ labelText, name, onChange, responded }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {labelText}
      </label>
      {radioBoolean.map((choice, index) => (
        <div className="flex items-center mb-4" key={index}>
          <input
            id={name}
            type="radio"
            value={responded}
            name={name}
            checked={responded === choice ? true : false}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={name}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {choice ? "Yes" : "No"}
          </label>
        </div>
      ))}
    </div>
  );
}

export function TextAreaGroup({ labelText, name, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
}
