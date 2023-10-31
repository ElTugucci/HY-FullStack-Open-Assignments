import { useState } from "react";

const Title = () => {
  return <h1>Give feedback</h1>;
};
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  if (total.length == 0) {
    return <h2>No feedback yet</h2>;
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <StatisticLine text={"Good: "} value={good} />
        <StatisticLine text={"Neutral: "} value={neutral} />
        <StatisticLine text={"Bad: "} value={bad} />
        <StatisticLine text={"Total: "} value={total.length} />
        <StatisticLine text={"Average: "} value={getAverage(total)} />
        <StatisticLine
          text={"Positive: "}
          value={`${getPositivePercentage(total)}%`}
        />
      </div>
    );
  }
};

const getAverage = (total) => {
  const sum = total.reduce((a, b) => a + b, 0);
  const totalVotes = total.length;
  return sum / totalVotes;
};

const filterPositive = (total) => {
  let positiveCount = 0;
  total.forEach((element) => {
    if (element === 1) {
      positiveCount += 1;
    }
  });
  return positiveCount;
};

const getPositivePercentage = (total) => {
  return (filterPositive(total) / total.length) * 100;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState([]);

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    setTotal(total.concat(1));
  };
  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    setTotal(total.concat(-1));
  };

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setTotal(total.concat(0));
  };

  return (
    <div>
      <Title />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
