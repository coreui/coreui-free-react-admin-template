import React from 'react'
import { CButton, CButtonGroup } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPrint } from '@coreui/icons'
import ProtectedComponent from '../../../features/auth/ProtectedComp'
export default function ModeSelection({isEditMode, onToggle, onPrint, modeTransitioning}) {
  return (
    <div className="mode-controls print-hide" style={{ 
        position: 'absolute', 
        bottom: '10px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000,
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
        padding: '4px',
        display: 'flex' 
      }}>
        <ProtectedComponent actionName={'Map Management'}>
          <CButtonGroup size="sm">
            <CButton 
              color={!isEditMode ? 'info' : 'light'} 
              onClick={isEditMode ? onToggle : undefined}
              active={!isEditMode}
              disabled={modeTransitioning || !isEditMode}
              style={{ borderRadius: '4px 0 0 4px', fontWeight: 'bold', minWidth: '100px' }}
            >
        
              View
            </CButton>
            <CButton 
              color={isEditMode ? 'info' : 'light'} 
              onClick={!isEditMode ? onToggle : undefined}
              active={isEditMode}
              disabled={modeTransitioning || isEditMode}
              style={{ borderRadius: '0 4px 4px 0', fontWeight: 'bold', minWidth: '100px' }}
            >
              <i className="fas fa-edit me-2"></i>
              Edit
            </CButton>
          </CButtonGroup>
        </ProtectedComponent>

     
        {!isEditMode && (
          <CButton
            color="success"
            size="sm"
            onClick={onPrint}
            className="ms-2 print-hide"
            style={{ fontWeight: 'bold', borderRadius: '4px' }}
          >
            <CIcon icon={cilPrint} />
          </CButton>
        )}
       
      </div>
  )
}

     