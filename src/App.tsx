import { useState, useEffect } from "react";
import { data } from "./data";
import clsx from "clsx";

function App() {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [bmi, setBmi] = useState<number>(0);

  useEffect(() => {
    let fullBmi: number = 0;

    if (heightUnit === "cm" && weightUnit === "kg") {
      fullBmi = weight / Math.pow(height / 100, 2);
    } else if (heightUnit === "cm" && weightUnit === "lb") {
      fullBmi = weight / 2.205 / Math.pow(height / 100, 2);
    } else if (heightUnit === "ft" && weightUnit === "kg") {
      fullBmi = weight / Math.pow(height / 3.281, 2);
    } else if (heightUnit === "ft" && weightUnit === "lb") {
      fullBmi = weight / 2.205 / Math.pow(height / 3.281, 2);
    }
    return setBmi(Math.round(fullBmi * 100) / 100); // round to 2 decimal places
  }, [height, weight, heightUnit, weightUnit]);

  // styles to color code BMI value
  const bmiColor = clsx(
    bmi < 18.5
      ? "text-blue-500"
      : bmi >= 18.5 && bmi < 25
        ? "text-green-500"
        : bmi >= 25 && bmi < 30
          ? "text-yellow-500 font-medium"
          : bmi >= 30 && bmi < 35
            ? "text-yellow-700 font-medium"
            : bmi >= 35 && bmi < 40
              ? "text-red-500 font-bold"
              : bmi >= 40
                ? "text-red-700 font-bold"
                : "",
  );

  return (
    <div className="flex-0 flex max-w-md flex-col items-center justify-center rounded-3xl border border-blue-200 bg-blue-100 p-5">
      <h1 className="mb-4 text-xl font-bold">BMI Calculator</h1>

      <div className="flex flex-col gap-5">
        <p className="">
          height: {height}
          <br />
          weight: {weight}
          <br />
          heightUnit: {heightUnit}
          <br />
          weightUnit: {weightUnit}
          <br />
          bmi: {bmi}
          <br />
        </p>
        {data.map((item, i) => (
          <div key={i} className="flex flex-wrap gap-x-2">
            <label className="mb-1 block w-full">{item.label}</label>
            <input
              type="number"
              value={
                item.label === "Height"
                  ? height
                  : item.label === "Weight"
                    ? weight
                    : 0
              }
              onChange={(e) =>
                item.label === "Height"
                  ? setHeight(parseInt(e.target.value))
                  : setWeight(parseInt(e.target.value))
              }
              className="h-10 w-80 flex-1 rounded-md border-2 border-gray-300 px-3"
            />
            <select
              className="h-10  w-80 flex-1 rounded-md border-2 border-gray-300 px-3"
              onChange={(e) => {
                item.label === "Height"
                  ? setHeightUnit(e.target.value)
                  : setWeightUnit(e.target.value);
              }}
            >
              {item.units.map((unit, i) => (
                <option key={i} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {bmi ?? bmi > 0 ? (
          <div className="flex justify-end">
            <p className={`${bmiColor} `}>
              <span>BMI: {bmi}</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
