import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import roleAccessReducer from './slices/roleaccess';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const roleAccessPersistConfig = {
  key: 'roleaccess',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['rolepermissions', 'rolemodules'],
};

const rootReducer = combineReducers({
  roleaccess: persistReducer(roleAccessPersistConfig, roleAccessReducer),
});

export { rootReducer, rootPersistConfig };
