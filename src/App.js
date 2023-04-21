import { useState } from "react";
import "./App.css";
import BmiList from "./components/bmiList";
import BmiScore from "./components/bmiscore";
import Form from "./components/form";

function App() {
  const [show, setShow] = useState(false);
  const [changeWeight, setchangeWeight] = useState({ weight: "", type: "" });
  const [Bmi, setBmi] = useState("00");
  const [BmiType, setBmiType] = useState("Not Calculated");
  const [bmiRange, setbmiRange] = useState({
    underweight: { low: "" },
    normal: { low: "", high: "" },
    overweight: { low: "", high: "" },
    obsityone: { low: "", high: "" },
    obsitytwo: { low: "", high: "" },
    obsitythree: { high: "" },
  });
  const onFormSub = (w, h) => {
    let b = calBmi(w, h);
    setBmi(b);
    setBmiType(weightType(b));
    console.log(w, h);
    const range = {
      underweight: { low: calweight(18.5, h) },
      normal: { low: calweight(18.5, h), high: calweight(24.9, h) },
      overweight: { low: calweight(25, h), high: calweight(29.9, h) },
      obsityone: { low: calweight(30, h), high: calweight(34.9, h) },
      obsitytwo: { low: calweight(35, h), high: calweight(39.9, h) },
      obsitythree: { high: calweight(40, h) },
    };
    setbmiRange(range);
    setchangeWeight(weightChange(b, w, range));
    setShow(true);
  };

  const calBmi = (w, h) => (w / (h * h)).toFixed(2);

  const calweight = (b, h) => (b * h * h).toFixed(2);

  const weightChange = (b, w, range) => {
    let changeObj;
    if (b > 24.9) {
      changeObj = {
        weight: (w - range.normal.high).toFixed(2),
        type: "positive",
      };
      return changeObj;
    } else if (b < 18.5) {
      changeObj = {
        weight: (range.normal.low - w).toFixed(2),
        type: "negative",
      };
      return changeObj;
    } else {
      changeObj = { weight: 0, type: "normal" };
      return changeObj;
    }
  };

  const weightType = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (18.5 < bmi && bmi < 24.9) {
      return "normal";
    } else if (25 < bmi && bmi < 29.9) {
      return "Over Weight";
    } else if (30 < bmi && bmi < 34.9) {
      return "Obesity Class I";
    } else if (35 < bmi && bmi < 39.9) {
      return "Obesity Class II";
    } else if (bmi > 40) {
      return "Obesity Class III";
    }
  };

  return (
    <>
      <Form getData={onFormSub} />
      {show && (
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-sm-6 mb-5">
            <BmiScore
              BmiNo={Bmi}
              BmiName={BmiType}
              changeWeight={changeWeight}
            />
            <div></div>
          </div>
          <div className="col-12 col-sm-6">
            <BmiList range={bmiRange} bmi={Bmi} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
