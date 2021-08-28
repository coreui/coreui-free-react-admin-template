import globalReducer from './globalSlice'
import loginReducer from './loginSlice'
import columnSummaryReducer from './columnSummarySlice'
import profileReducer from './profileSlice'
import searchReducer from './searchSlice'
import careerReducer from './careerSlice'

export const reducers = {
  global: globalReducer,
  login: loginReducer,
  columnSummary: columnSummaryReducer,
  profile: profileReducer,
  search: searchReducer,
  career: careerReducer,
}
