import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getUsers } from "../../../../store/Actions";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Blocked': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const dispatch=useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usersData,setUsersData]=useState()
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

//get Users List
useEffect(()=>{
  dispatch(
    getUsers((err, response) => {
      console.log(response.users)
      setUsersData(response.users)
    }))

},[])


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'emailAddress', 'phoneNumber', 'additionalSubjects','upscAttempts','status','Actions'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
         //   onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge("Blocked")}>
                      Blocked
                    </CBadge>
                  </td>
                ),
                "Actions":
                (item)=>(
                  <td>
                  <CDropdown
                  className="c-header-nav-items mx-2"
                  direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <CIcon name="cil-pencil" />
    </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-pencil" className="mfe-2" />
          Edit 
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Delete
        </CDropdownItem>
   
        <CDropdownItem divider />
        <CDropdownItem>
        <CIcon name="cil-user" className="mfe-2" />
          View Details
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
                  </td>
                
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
