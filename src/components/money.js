import React, { useState, useEffect } from 'react'
import axios from './axiosConfig'
import { AppContent, AppFooter, AppHeader } from './index'
import './css/style.css'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardFooter } from '@coreui/react'
import TotalExpensesCard from './widgets/totalExpensesCard'
import dayjs from 'dayjs'
import CategoriesChart from './widgets/categoriesChart'
import SubCAtegoriesChart from './widgets/subCategoriesChart'
import ExpensesTable from './widgets/ExpensesTable'
import CreditCardsTypes from './widgets/creditCardsTypes'
import CreditCardDept from './widgets/CreditCardDept'
import MonthsChart from './widgets/monthsChart'
import SelectMonth from './widgets/SelectMonth'
import CCPaymentsTable from './widgets/CCPaymentsTable'
import { yearCalendarClasses } from '@mui/x-date-pickers'

const getMonth = () => {
  const day = dayjs().format('DD')
  const month = dayjs().format('MMMM')
  const nextMonth = dayjs().add(1, 'month').format('MMMM')
  if (day <= 15) return month
  else return nextMonth
}
const thisYear = () => {
  const month = getMonth()
  if (dayjs().format('MMMM') == 'December' && month == 'January')
    return dayjs().add(1, 'year').year()
  else return dayjs().format('YYYY')
}

const MoneyDashboard = () => {
  const url = process.env.REACT_APP_API_URL
  const year = thisYear()
  const [month, setMonth] = useState(getMonth())
  const [limit, setLimit] = useState(null)
  const [monthlyTotal, setMonthlyTotal] = useState(null)
  const [monthlyCategoriesDetails, setmonthlyCategoriesDetails] = useState(null)
  const [monthlySubCategoriesDetails, setmonthlySubCategoriesDetails] = useState(null)
  const [monthlyExpenses, setMonthlyExpenses] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(false)
  const [detailsContent, setDetailsContent] = useState(false)
  const [type, setType] = useState(false)
  const [dept, setDept] = useState(false)
  const [monthlyChart, setMonthlyChart] = useState(false)
  const [data, setData] = useState(false)
  const [categories, setCategories] = useState([])

  const changeSelectedMonth = (month) => {
    setMonth(month)
    setMonthlyTotal(data['expenses']['total'][year][month]['total'])
    setLimit(data['limit'])
    setmonthlyCategoriesDetails(data['expenses']['total'][year][month])
    console.log(data['expenses']['total'][year][month])
    setmonthlySubCategoriesDetails(data['expenses']['total'][year][month])
    setDetailsContent(data['expenses']['content'][year][month])
    setMonthlyExpenses(data['expenses']['content'][year][month])
    setType(data['expenses']['type'][year][month])
    setDept(data['expenses']['dept'])
    setMonthlyChart(data['expenses']['total'][year])
  }

  const setSubcategoriesData = () => {
    let dataKeys = monthlySubCategoriesDetails.keys(data)
    let labels = []
    let values = []
    let output = []

    if (Array.isArray(dataKeys)) {
      // Use the map function on the dataKeys array
      dataKeys.map((index) => {
        if (index !== 'total') {
          const subcategories = Object.keys(data[index])
          subcategories.map((key) => {
            if (key != 'total') {
              labels.push(key)
              values.push(data[index][key]['total'])
            }
          })
          output['label'] = labels
          output['values'] = values
        }
      })
      return output
    }
  }

  useEffect(() => {
    axios.post(url + 'credit_card/expenses').then((response) => {
      if (typeof response.data['expenses']['total'][year][month] !== 'undefined') {
        setData(response.data)
        setMonthlyTotal(response.data['expenses']['total'][year][month]['total'])
        setLimit(response.data['limit'])
        setmonthlyCategoriesDetails(response.data['expenses']['total'][year][month])
        setmonthlySubCategoriesDetails(response.data['expenses']['total'][year][month])
        setDetailsContent(response.data['expenses']['content'][year][month])
        setMonthlyExpenses(response.data['expenses']['content'][year][month])
        setType(response.data['expenses']['type'][year][month])
        setDept(response.data['expenses']['dept'])
        setMonthlyChart(response.data['expenses']['total'][year])
      } else {
        setMonthlyTotal(0)
        setLimit(response.data['limit'])
      }
    })

    //get the categories
    axios.get(url + 'categories').then((response) => {
      setCategories(response.data)
    })
  }, [])
  const filterPerCAtegory = (category) => {
    if (category != null) {
      let data = monthlyCategoriesDetails[category]
      setmonthlySubCategoriesDetails(data)

      // Use the useState callback syntax to work with the updated state
      setmonthlySubCategoriesDetails((prevData) => {
        setSelectedSubcategory(true)
        setMonthlyExpenses(detailsContent[category])
        return data
      })
    }
  }
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer fluid>
            <CRow>
              <CCol sm={6} lg={3}>
                <TotalExpensesCard month={month} total={monthlyTotal} limit={limit} />
              </CCol>
              <CCol sm={6} lg={3}>
                <CreditCardsTypes data={type} />
              </CCol>
              <CCol sm={6} lg={3}>
                <CreditCardDept data={dept} />
              </CCol>
              <CCol sm={6} lg={3}>
                <SelectMonth data={monthlyChart} month={month} change={changeSelectedMonth} />
              </CCol>
            </CRow>
            {monthlyCategoriesDetails != null && (
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    <CCol sm={12}>
                      <h4 id="traffic" className="card-title mb-0">
                        {month} Expenses
                      </h4>
                    </CCol>
                    <CCol lg={6}>
                      <CategoriesChart
                        data={monthlyCategoriesDetails}
                        filterPerCategory={filterPerCAtegory}
                        percentage={monthlyTotal / limit}
                      />
                    </CCol>
                    <CCol lg={6}>
                      <SubCAtegoriesChart
                        data={monthlySubCategoriesDetails}
                        percentage={monthlyTotal / limit}
                        selectedSubcategory={selectedSubcategory}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center"></CRow>

                  <ExpensesTable
                    month={month}
                    year={year}
                    data={monthlyExpenses}
                    selectedSubcategory={selectedSubcategory}
                  />
                  <CRow>
                    <CCol sm={12}>
                      <h4 id="traffic" className="card-title mb-0">
                        {month} Expenses
                      </h4>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol lg={12}>
                      <MonthsChart data={monthlyChart} categories={categories} />
                    </CCol>
                  </CRow>

                  <CCPaymentsTable
                    month={month}
                    year={year}
                    data={monthlyExpenses}
                    selectedSubcategory={selectedSubcategory}
                  />
                </CCardFooter>
              </CCard>
            )}
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default MoneyDashboard
