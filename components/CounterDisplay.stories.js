import CounterDisplay from './CounterDisplay';
import CounterDecorator from '../.storybook/decorators/CounterDecorator';

export default {
  title: 'components/Counter Display',
  component: CounterDisplay,
  decorators: [CounterDecorator],
};

const Template = props => <CounterDisplay {...props} />;

export const Default = Template.bind({});

export const CountIs22 = Template.bind({});
CountIs22.parameters = {
  counter: {
    count: 22,
  },
};

export const AnotherStory = Template.bind({});
AnotherStory.parameters = {
  counter: {
    count: 999,
  },
};
