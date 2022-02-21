import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import accountReducer from './reducers/accountReducer';
import operationReducer from './reducers/operationReducer';

const storeCombined = combineReducers({
  auth: authReducer,
  user: userReducer,
  account: accountReducer,
  operation: operationReducer,
});

const configureStore = () => {
  const store = createStore(
    storeCombined,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  return { store };
};

export default configureStore;
