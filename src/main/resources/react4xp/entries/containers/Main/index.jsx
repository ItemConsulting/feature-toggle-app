import React from 'react'
import { useSelector } from 'react-redux'
import { selectTest } from './selectors'

export function Main() {
    const test = useSelector(selectTest)

    return (
    <div>
      <h1>{test}</h1>
    </div>
  );
}
