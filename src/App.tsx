import { useState, useEffect } from "react";
import { data } from "./data";
import clsx from "clsx";

function App() {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [bmi, setBmi] = useState<number>(0);
  const [bmiDescription, setBmiDescription] =
    useState<string>("Healthy weight");

  useEffect(() => {
    let fullBmi: number = 0;
    let weightValue: number = 0;
    let heightValue: number = 0;

    // calculate BMI
    if (weightUnit === "kg") {
      weightValue = weight;
    } else if (weightUnit === "lb") {
      weightValue = weight / 2.205;
    }

    if (heightUnit === "cm") {
      heightValue = height / 100;
    } else if (heightUnit === "ft") {
      heightValue = height / 3.281;
    }

    fullBmi = weightValue / Math.pow(heightValue, 2);

    // set BMI description
    if (fullBmi < 18.5) {
      setBmiDescription("Underweight");
    } else if (fullBmi >= 18.5 && fullBmi < 25) {
      setBmiDescription("Healthy weight");
    } else if (fullBmi >= 25 && fullBmi < 30) {
      setBmiDescription("Overweight");
    } else if (fullBmi >= 30 && fullBmi < 35) {
      setBmiDescription("Obese Class I");
    } else if (fullBmi >= 35 && fullBmi < 40) {
      setBmiDescription("Obese Class II");
    } else if (fullBmi >= 40) {
      setBmiDescription("Obese Class III");
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
    <div className="flex-0 flex min-w-0 max-w-sm flex-col items-center justify-center rounded-2xl border-blue-200 bg-white p-5 font-medium shadow-xl shadow-blue-700/20 sm:rounded-3xl sm:p-8">
      <h1 className="mb-4 text-2xl font-black text-blue-700">BMI Calculator</h1>

      <div className="flex flex-col gap-5">
        {/* debug */}
        {/* <p className="text-xs">
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
        </p> */}
        <p className="text-sm font-normal text-slate-500">
          BMI is a measurement of a person's leanness or corpulence based on
          their height and weight, and is intended to quantify tissue mass.
        </p>
        {data.map((item, i) => (
          <div key={i} className="flex flex-wrap gap-x-2">
            <label className="mb-1 block w-full text-sm">{item.label}</label>
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
              className="h-10 w-full min-w-0 flex-1 rounded-md border-b border-blue-100 px-3 shadow-[0_2px_5px_0_rgba(0,0,0,0.1)] outline-offset-2 transition-shadow focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-blue-300"
            />
            <select
              className="h-10 w-full flex-1 rounded-md border-b border-blue-100 px-3  shadow-[0_2px_5px_0_rgba(0,0,0,0.1)] outline-offset-2 transition-shadow focus-visible:shadow-md focus-visible:outline-4 focus-visible:outline-blue-300"
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
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <p>
              <a
                href="https://en.wikipedia.org/wiki/Body_mass_index"
                className="text-sm text-blue-500 underline hover:no-underline"
                target="_blank"
              >
                More info
              </a>
            </p>
            <p className={`${bmiColor} `}>
              BMI: {bmi} ({bmiDescription})
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
