import React from 'react';
import { useContext } from 'react';
import { CounterContext } from '../lib/context/counter-context';

const Mother = () => {
  const { incrementCount, decrementCount, count } = useContext(CounterContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>{count}</h1>
    </div>
  );
};

export default Mother;
