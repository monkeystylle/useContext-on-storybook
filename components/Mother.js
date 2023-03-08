import React from 'react';
import { useContext } from 'react';
import { CounterContext } from '../lib/context/counter-context';

const Mother = () => {
  const { incrementCount, decrementCount, count } = useContext(CounterContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>{count}</h1>
      <button style={{ width: '150px' }} onClick={incrementCount}>
        Increment
      </button>
      <button style={{ width: '150px' }} onClick={decrementCount}>
        Decrement
      </button>
    </div>
  );
};

export default Mother;
