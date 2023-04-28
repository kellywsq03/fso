import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const calcAvg = (a, b, c) => {
    if (a || b || c) {
      return (a + c*-1) / (a + b + c)
    } else {
      return 0
    }
  }
  let average = calcAvg(good, neutral, bad)

  const calcPos = (a, b, c) => {
    if (a || b || c) {
      return (a / (a+b+c)) * 100
    } else {
      return 0
    }
  }

  let positive = calcPos(good, neutral, bad) + "%"

  return (
    <div>
      <Header name="statistics"/>
      <Content text="good" value={good} />
      <Content text="neutral" value={neutral} />
      <Content text="bad" value={bad} />
      <Content text="all" value={good + neutral + bad} />
      <Content text="average" value={average} />
      <Content text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      

    </div>
  )
}

export default App