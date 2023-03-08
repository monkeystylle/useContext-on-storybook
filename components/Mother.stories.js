import Mother from './Mother';
import { useState } from 'react';
import { CounterContext } from '../lib/context/counter-context';
import { useParameter } from '@storybook/addons';
// import CounterDecorator from '../.storybook/decorators/CounterDecorator';

function CounterDecorator(Story, context) {
  const initialState = useParameter('counter', {
    incrementCount: () => {
      setState(count + 1);
    },
    decrementCount: () => {
      setState(count - 1);
    },
    count: 0,
  });

  const [state, setState] = useState({ ...initialState });

  return (
    <div>
      <CounterContext.Provider value={state}>
        <Story />
      </CounterContext.Provider>
    </div>
  );
}

export default {
  title: 'components/Mother',
  component: Mother,
  decorators: [CounterDecorator],
};

const Template = props => <Mother {...props} />;

export const Default = Template.bind({});

export const CountIs22 = Template.bind({});
CountIs22.parameters = {
  counter: {
    count: 1999,
  },
};
