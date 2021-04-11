import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import {rootSaga} from './sagas';
const sagaMiddleware = createSagaMiddleware();
const isDevelopmentEnv =
  process && process.env && process.env.NODE_ENV === 'development';
const isProductionEnv =
  process && process.env && process.env.NODE_ENV === 'production';
const logStoreInfo = false;
const middlewares = [sagaMiddleware];
function actionLogger({getState}) {
  return (next) => (action) => {
    let allowed = [
      'jumio',
      'notificationsReducer',
      'otp',
      'companies',
      'signIn',
      'updateContactDetailsReducer',
      'userProfile',
      'vaccinations',
    ];
    let state = getState();
    let loggedStates = Object.keys(state)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: state[key],
        };
      }, {});
    console.info({actionType: action.type, loggedStates});
    const returnValue = next(action);
    return returnValue;
  };
}
if (isDevelopmentEnv && logStoreInfo) {
  middlewares.push(createLogger());
}
if (isProductionEnv) {
  middlewares.push(actionLogger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;
