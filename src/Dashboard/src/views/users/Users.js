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
  CImg,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getUsers ,getUserById,blockUser,unblockUser} from "../../../../store/Actions";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Unblock': return 'warning'
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
  const[blocking,setBlocking]=useState(true)
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
      setUsersData(response.users)
    }))

},[blocking])

// Edit User

const handleEditUser=(id)=>{
  dispatch(
    getUserById(id,(err, response) => {
      if(err)
      console.log(err)
    else
      {
        const editUser=response.res.data.data
        const editUserId=response.res.data.data._id
        history.push({
          pathname: `/user/edit/${editUserId}`,
       });
      }
    }))

}


//Block User
const handleBlockUser=(id)=>{
  dispatch(
    blockUser(id,(err, response) => {
      if(err)
      console.log(err)
      else
      setBlocking(!blocking)
    }))

}

//Unblock User
const handleUnBlockUser=(id)=>{
  dispatch(
    unblockUser(id,(err, response) => {
      if(err)
      console.log(err)
      else
      setBlocking(!blocking)
    }))

}


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader size={50}>
            Users 
          </CCardHeader>
          <CCardBody>
          <CDataTable
           tableFilter
            items={usersData}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'emailAddress', 'phoneNumber','upscAttempts','additionalSubjects','status','Block User','Edit Details'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
         //   onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    {
                      item.blocked?
                    <CBadge color={getBadge("Blocked")}>
                      Blocked
                    </CBadge>:
                     <CBadge color={getBadge("Active")}>
                     Active
                   </CBadge>
            }
                  </td>
                ),
                "Block User":(item)=>(
                  <td>
                    {item.blocked?
                       <CButton variant="outline" color="success" 
                       size="sm" block onClick={()=>handleUnBlockUser(item._id)}>Unblock</CButton>:
                    
                  <CButton variant="outline" color="danger" 
                  size="sm" block onClick={()=>handleBlockUser(item._id)}>Block</CButton>
                    }
                </td>
                ),
             
                "Edit Details":(item)=>(
                  <td>
                  <CButton variant="outline" color="warning" 
                  size="sm" block onClick={()=>handleEditUser(item._id)}>Edit</CButton>
                </td>
                ),
               
             }}
          />
          <CPagination
            limit={5}
            activePage={page}
            onActivePageChange={pageChange}
            pages={40}
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
