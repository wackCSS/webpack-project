import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filterCriteriaReducer from './FilterCriteriaReducer';
import ArtistsReducer from './ArtistsReducer';
import ErrorReducer from './ErrorReducer';
import SelectionReducer from './SelectionReducer';

console.log(123);

export default combineReducers({
  form: formReducer,
  filterCriteria: filterCriteriaReducer,
  artists: ArtistsReducer,
  errors: ErrorReducer,
  selection: SelectionReducer
});
