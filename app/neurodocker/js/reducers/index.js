import { createReducer } from "redux-orm";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";


const config = {
  key: "neurodocker",
  storage
};

const neurodockerApp = persistCombineReducers(config, {
});

export default neurodockerApp;
