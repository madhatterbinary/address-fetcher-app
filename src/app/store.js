// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

const enhancedComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();

const middleware = applyMiddleware(
  thunk,
  routerMiddleware(history),
);

export default rootReducer => createStore(
  rootReducer(history),
  enhancedComposer(middleware)
);
