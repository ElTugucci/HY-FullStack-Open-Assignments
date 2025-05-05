import { useState } from "react";

const Button = ({ handler, text }) => {
  return <button onClick={handler}> {text} </button>;
};

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>{votes} votes.</p>
    </div>
  );
};

const App = () => {
  const initVotes = new Uint8Array(8);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initVotes);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getAnecdote = () => {
    const selectedAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(selectedAnecdote);
  };

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    console.log(copy);
    setVotes(copy);
  };

  const getTop = () => {
    let maxVotes = 0;
    let topAnecdoteIndex = 0;

    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > maxVotes) {
        maxVotes = votes[i];
        topAnecdoteIndex = i;
      }
    }
    return topAnecdoteIndex;
  };
  return (
    <div>
      <Anecdote
        title="Anecdote of the Day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <p>
        <Button handler={vote} text="Vote" />
        <Button handler={getAnecdote} text="Next Anecdote" />
      </p>
      <Anecdote
        title="Top Anecdote"
        anecdote={anecdotes[getTop()]}
        votes={votes[getTop()]}
      />
    </div>
  );
};

export default App;
