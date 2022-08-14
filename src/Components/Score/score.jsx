import React from 'react';
import {useSelector} from "react-redux";

function Score() {
  const score = useSelector((state) => state.score)
  const question = useSelector((state) => state.selected)
  console.log(score)
  console.log(question)
  return (<div></div>);
}

export default Score;