import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://costco.com" target="_blank" rel="noopener noreferrer">Costco Fleet</a>
        <span className="ml-1">&copy; 2020 Costco Monroe Fleet.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://costco.com" target="_blank" rel="noopener noreferrer">Costco Monroe Fleet</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
