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
import { getUsers ,getUserById,blockUser,unblockUser,getTestApprovals, getApproveTestById, saveTest, deleteApproveTest} from "../../../../../store/Actions";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Unblock': return 'warning'
    case 'Blocked': return 'danger'
    default: return 'primary'
  }
}

const TestApproval = () => {
  const history = useHistory()
  const dispatch=useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [approvalData,setApprovalData]=useState()
 
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

//get Approve Test List
useEffect(()=>{
 approveTests()

},[])

const approveTests=()=>{
    dispatch(
        getTestApprovals((err, response) => {
            console.log("res",response?.approvals)
            setApprovalData(response?.approvals)
        }))
}


// Approve Test

const handleApprove=(id)=>{
   

    dispatch(
        getApproveTestById(id, (err, response) => {
          if (err)
            console.log(err)
          else {
        dispatch(
            saveTest(response.res.data.data, (err, response) => {
              if (err) {
                console.log(err)
             alert("failed")
              } else {
               dispatch(
                        deleteApproveTest({ id: id}, (err, response) => {
                          if (err) {
                            alert("Approval Failed ")
                     } else {
                            alert("Approval Succesfull ")
                            approveTests()
                      }
                        
                        })
                      );
              
              }
            
    
            })
          );
    

          }
        }))





  
}


//Delete Test
const handleDelete=(id)=>{
    dispatch(
        deleteApproveTest({ id: id}, (err, response) => {
          if (err) {
            alert("Approval Failed ")
     } else {
            alert("Approval Deleted ")
            approveTests()
      }
        
        })
      );

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
            items={approvalData}
            fields={[
              { key: 'username', _classes: 'font-weight-bold' },
              'instituteName', 'testName','testCategory','Approve','Delete'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
         //   onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
          
                "Approve":(item)=>(
                  <td>
                    
                       <CButton variant="outline" color="success" 
                       size="sm" block onClick={()=>handleApprove(item._id)}>Approve</CButton>
                    
                </td>
                ),
             
                "Delete":(item)=>(
                  <td>
                  <CButton variant="outline" color="danger" 
                  size="sm" block onClick={()=>handleDelete(item._id)}>Delete</CButton>
                </td>
                ),
                "username":(item)=>(
                <p style={{padding:10}}>
                {item?.approvalUser?.userName}
                </p> 
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

export default TestApproval
