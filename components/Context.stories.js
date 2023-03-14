/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { withReactContext } from 'storybook-react-context';

const ExampleContext = React.createContext();

export default {
  title: 'storybook-react-context',
  decorators: [
    withReactContext({
      Context: ExampleContext,
      initialState: { authenticated: false },
    }),
  ],
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

// Setup

const PureComponent = ({ children, authenticated }) => (
  <div className="font-sans max-w-sm rounded shadow-lg bg-white p-4">
    {children}
    <h1
      id="auth-status"
      className={`rounded text-center p-4 m-0 bg-${
        authenticated ? 'green' : 'red'
      }-400`}
    >
      {authenticated ? 'Authenticated' : 'Unauthenticated'}
    </h1>
  </div>
);

const ComponentWithContext = ({ children }) => {
  const ctx = React.useContext(ExampleContext);
  // Either a tuple from reducer, object from the custom provider hook or initialState
  const state = Array.isArray(ctx) ? ctx[0] : ctx.state || ctx;
  return <PureComponent {...state}>{children}</PureComponent>;
};

const Toolbar = ({ onToggle }) => (
  <div>
    <button type="button" onClick={onToggle} id="context-button">
      Toggle value
    </button>
  </div>
);

// build your own provider value to be injected into the context provider.
const useProviderValue = initialState => {
  const [state = initialState, setState] = React.useState();
  return {
    state,
    setState,
  };
};

// Stories

export const SimulateLoading = (_, { context: { state, setState } }) => {
  React.useEffect(() => {
    if (state.loaded) return () => {};
    const id = setTimeout(() => {
      setState({ authenticated: true, loaded: true });
    }, 2000);

    return () => clearTimeout(id);
  }, [state.loaded]);

  return (
    <ComponentWithContext>
      <p>Changing the context from story's useEffect.</p>
      <p id="loading-status">{state.loaded ? 'Loaded.' : 'Loading…'}</p>
    </ComponentWithContext>
  );
};
SimulateLoading.parameters = {
  reactContext: {
    useProviderValue,
  },
};

//change on interaction
export const ChangeOnInteraction = (_, { context: [state, setState] }) => (
  <>
    <ComponentWithContext>
      <p>Changing the context on interaction.</p>
    </ComponentWithContext>
    <Toolbar
      onToggle={() => setState({ authenticated: !state.authenticated })}
    />
  </>
);
ChangeOnInteraction.parameters = {
  reactContext: {
    reducer: (state, action) => ({
      ...state,
      ...action,
    }),
  },
};

//static initial context
export const StaticInitialContext = () => (
  <ComponentWithContext>
    <p>Set custom context from story.</p>
  </ComponentWithContext>
);
StaticInitialContext.parameters = {
  reactContext: {
    initialState: { authenticated: false },
  },
};

//update context from args
export const UpdateContextFromArgs = args => {
  return (
    <ComponentWithContext>
      <p>Change context from Storybook Controls.</p>
    </ComponentWithContext>
  );
};
UpdateContextFromArgs.args = {
  authenticated: false,
};
UpdateContextFromArgs.parameters = {
  reactContext: {
    // useProviderValue exposes args as second parameter
    useProviderValue: (state, args) => args,
  },
  options: {
    showPanel: true,
  },
};
