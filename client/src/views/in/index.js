import React from 'react'

const ColumnSummary = React.lazy(() => import('./columnSummary'))
const Column = React.lazy(() => import('./column'))
const Career = React.lazy(() => import('./career'))

const Recruitment = React.lazy(() => import('./recruitment'))
const AddRecruitment = React.lazy(() => import('./recruitment/add'))
const EditRecruitment = React.lazy(() => import('./recruitment/edit'))
const OwnRecruitment = React.lazy(() => import('./recruitment/own'))

const Recommendation = React.lazy(() => import('./recommendation'))
const AddRecommendation = React.lazy(() => import('./recommendation/add'))
const EditRecommendation = React.lazy(() => import('./recommendation/edit'))
const OwnRecommendation = React.lazy(() => import('./recommendation/own'))

const Profile = React.lazy(() => import('./profile'))
const EditProfile = React.lazy(() => import('./profile/edit'))
const SearchProfile = React.lazy(() => import('./profile/search'))

const Study = React.lazy(() => import('./study'))

const Matching = React.lazy(() => import('./matching'))

export {
  ColumnSummary,
  Column,
  Career,
  Recruitment,
  AddRecruitment,
  EditRecruitment,
  OwnRecruitment,
  Recommendation,
  AddRecommendation,
  EditRecommendation,
  OwnRecommendation,
  Profile,
  EditProfile,
  SearchProfile,
  Study,
  Matching,
}
