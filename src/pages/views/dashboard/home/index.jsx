import React from 'react'
import { DashboardCards } from '../../../../component/cards/dashboard-cards'

const HomeDashboard = ({metrics}) => {
  return (
    <div>
        <DashboardCards metrics={metrics} />
    </div>
  )
}

export default HomeDashboard