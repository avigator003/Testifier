import React, { useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getApprovals } from '../../../store/Actions'

const TheHeaderDropdownMssg = () => {

  return (
    
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
     
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info"></CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>You have  Test approvals</strong>
        </CDropdownItem>

        <CDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={'https://robohash.org/49dacd6b5e33b96a7c18fc8bdfd12111?set=set4&bgset=&size=400x400'}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted"></small>
              <small className="text-muted float-right mt-1"></small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important message
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
          </div>
        </CDropdownItem>



      </CDropdownMenu>

    </CDropdown>
  )
}

export default TheHeaderDropdownMssg