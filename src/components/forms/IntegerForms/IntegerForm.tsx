import React, { FormEvent, useRef, useState } from "react";
import classes from "./IntegerForm.module.css";
import { Link } from "react-router-dom";

interface GeneratorProps {
  startNum: number;
  endNum: number;
  elementsAmount: number;
  numberType: string;
  sorting: string;
  decimalPlaces?: number; // Optional property for decimal places
}

const generateIntegers = ({
  startNum,
  endNum,
  elementsAmount,
  numberType,
  sorting,
  decimalPlaces = 2, // Default to 2 decimal places if not provided
}: GeneratorProps): number[] => {
  const numbersArray: number[] = [];
  const range = endNum - startNum + 1;

  for (let i = 0; i < elementsAmount; i++) {
    let randomNumber: number;
    if (numberType === "integer") {
      randomNumber = Math.floor(Math.random() * range) + startNum;
    } else {
      const randomDecimal = Math.random() * range + startNum;
      randomNumber = parseFloat(randomDecimal.toFixed(decimalPlaces));
    }
    numbersArray.push(randomNumber);
  }

  if (sorting === "ascending") {
    numbersArray.sort((a, b) => a - b);
  } else if (sorting === "descending") {
    numbersArray.sort((a, b) => b - a);
  }

  return numbersArray;
};

const IntegerForm: React.FC = () => {
  const startNumberRef = useRef<HTMLInputElement>(null);
  const endNumberRef = useRef<HTMLInputElement>(null);
  const elementsNumberRef = useRef<HTMLInputElement>(null);
  const numberTypeRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const decimalPlacesRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const integerSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startNum = Number(startNumberRef.current?.value);
    const endNum = Number(endNumberRef.current?.value);
    const elementsAmount = Number(elementsNumberRef.current?.value);
    const numberType = numberTypeRef.current?.value || "integer";
    const sorting = sortRef.current?.value || "random";
    const decimalPlaces = Number(decimalPlacesRef.current?.value) || 2;

    if (!startNum || !endNum || !elementsAmount) {
      setError("Please fill in all fields.");
      return;
    }

    const result = generateIntegers({
      startNum,
      endNum,
      elementsAmount,
      numberType,
      sorting,
      decimalPlaces,
    });

    // Format numbers for display purposes (not needed for JSON output)
    const formattedNumbers = result.map((num) =>
      parseFloat(num.toFixed(decimalPlaces))
    );

    // Convert to JSON format
    const jsonArray = JSON.stringify(formattedNumbers, null, 2);

    const blob = new Blob([jsonArray], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "random_numbers.json";
    link.click();

    URL.revokeObjectURL(url);
    setError("");
  };

  return (
    <div className={classes.integerFormContainer}>
      <form onSubmit={integerSubmitHandler}>
        <label htmlFor="integerStart">Enter starting number</label>
        <br />
        <input
          type="number"
          id="integerStart"
          ref={startNumberRef}
          className={`${classes.inputField} ${
            error && !startNumberRef.current?.value && classes.inputError
          }`}
        />
        <br />
        <label htmlFor="integerEnd">Enter ending number</label>
        <br />
        <input
          type="number"
          id="integerEnd"
          ref={endNumberRef}
          className={`${classes.inputField} ${
            error && !endNumberRef.current?.value && classes.inputError
          }`}
        />
        <br />
        <label htmlFor="elementsAmount">Enter amount of elements</label>
        <br />
        <input
          type="number"
          id="elementsAmount"
          ref={elementsNumberRef}
          className={`${classes.inputField} ${
            error && !elementsNumberRef.current?.value && classes.inputError
          }`}
        />
        <br />
        <label htmlFor="numberType">Select type of numbers</label>
        <br />
        <select id="numberType" ref={numberTypeRef}>
          <option value="integer">Integers</option>
          <option value="decimal">Decimals</option>
        </select>
        <br />
        <label htmlFor="sort">Select sorting way</label>
        <br />
        <select id="sort" ref={sortRef}>
          <option value="random">Random</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <br />
        <label htmlFor="decimalPlaces">Decimal Places</label>
        <br />
        <input
          type="number"
          id="decimalPlaces"
          ref={decimalPlacesRef}
          className={`${classes.inputField} ${
            error && !decimalPlacesRef.current?.value && classes.inputError
          }`}
        />
        <br />
        {error && <p className={classes.error}>{error}</p>}
        <button type="submit">Generate</button>
        <Link to="/">
          <button>Back</button>
        </Link>
      </form>
    </div>
  );
};

export default IntegerForm;
