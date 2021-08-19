import globalReducer from './globalSlice'
import loginReducer from './loginSlice'
import columnSummaryReducer from './columnSummarySlice'

export const reducers = {
  global: globalReducer,
  login: loginReducer,
  columnSummary: columnSummaryReducer,
}
