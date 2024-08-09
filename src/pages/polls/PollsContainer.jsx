import { Outlet } from 'react-router-dom'
import MainLayout from '../../components/main/MainLayout'
import PollTab from '../../components/newPolls/PollTab'
import React from 'react'

const PollsContainer = () => {
  return (
    <MainLayout>
    <PollTab />
      
      <Outlet />
    </MainLayout>
  )
}

export default PollsContainer
