/* eslint-disable import/no-anonymous-default-export */
import Mother from './Mother';
import { withReactContext } from 'storybook-react-context';
import { useState } from 'react';
import { CounterContext } from '../lib/context/counter-context';
import { useParameter } from '@storybook/addons';
// import CounterDecorator from '../.storybook/decorators/CounterDecorator';

function CounterDecorator(Story) {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);

  return (
    <div>
      <CounterContext.Provider
        value={{
          count,
          incrementCount,
          decrementCount,
        }}
      >
        <Story />
      </CounterContext.Provider>
    </div>
  );
}

export default {
  title: 'Mother',
  component: Mother,
  decorators: [CounterDecorator],
};

const Template = props => <Mother {...props} />;

export const Default = Template.bind({});

export const CountIs22 = Template.bind({});
