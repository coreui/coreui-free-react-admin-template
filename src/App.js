import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import MainCategories from './components/MainCategories'
import AddExpenses from './components/AddExpenses'
import MoneyDashboard from './components/money'
import AddLoan from './components/Loans/AddLoan'
import AddLoanPayment from './components/AddLoanPayment'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRectangleList } from '@fortawesome/free-regular-svg-icons'
import Loans from './components/loans'
import AddGold from './components/inv/AddGold'
import AddHaj from './components/inv/AddHaj'
import AddInv from './components/inv/AddInv'
import Inv from './components/inv/inv'
import Stock from './components/stock/stock'
import AddInvestmentForm from './components/stock/AddInvestmentForm'
import SellStock from './components/stock/SellStock'
import AddLiquidityForm from './components/stock/AddLiquidityForm'
import StockSummary from './components/stock/StockSummary'
import SellInvestmentForm from './components/stock/SellInvestmentForm'

library.add(faRectangleList)

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/categories" name="Categories" element={<MainCategories />} />
            <Route
              exact
              path="/add_credit_card_expense"
              name="Categories"
              element={<AddExpenses />}
            />
            <Route
              exact
              path="/add_loan_payment"
              name="AddLoanPayment"
              element={<AddLoanPayment />}
            />
            <Route exact path="/money" name="Money" element={<MoneyDashboard />} />
            <Route exact path="/add_loan" name="Money" element={<AddLoan />} />
            <Route exact path="/loans" name="Money" element={<Loans />} />

            <Route exact path="/stock" name="Inv" element={<Stock />} />
            <Route exact path="/stock/sell" name="Inv" element={<SellStock />} />
            <Route exact path="/AddInvestmentForm" name="AddInv" element={<AddInvestmentForm />} />
            <Route
              exact
              path="/stock/AddLiquidityForm"
              name="AddInv"
              element={<AddLiquidityForm />}
            />
            <Route path="/stock/stock-summary" element={<StockSummary />} />

            <Route exact path="/inv" name="Inv" element={<Inv />} />

            <Route exact path="/add_haj" name="AddHaj" element={<AddHaj />} />

            <Route exact path="/add_gold" name="AddInv" element={<AddGold />} />

            <Route exact path="/add_investment" name="AddInv" element={<AddInv />} />

            <Route path="/sell-investment" element={<SellInvestmentForm />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
