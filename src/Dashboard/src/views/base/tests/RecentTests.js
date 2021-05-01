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
import { getAllTestsGiven} from "../../../../../store/Actions/index";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Unblock': return 'warning'
    case 'Blocked': return 'danger'
    default: return 'primary'
  }
}

const RecentTests = () => {
  const history = useHistory()
  const dispatch=useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [testsData,setTestsData]=useState()
  const[blocking,setBlocking]=useState(true)
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/test/recent?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

//get Tests List
useEffect(()=>{
  dispatch(
    getAllTestsGiven((err, response) => {
      setTestsData(response?.testsGiven)
    }))

},[])



//view  Analysis
const handleViewAnalysis=(id)=>{
  history.push({
    pathname: `/usertestanalysis/${id}`,
});
}

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader size={50}>
            Recent Tests 
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={testsData}
            fields={[
              { key: 'testName', _classes: 'font-weight-bold' },
              'instituteName', 'Username','Marks','View Analysis'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
         //   onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'testName':
              (item)=>(
                <td>
                  {
                    item.testId.testName
          }
                </td>
              ),
              'instituteName':
              (item)=>(
                <td>
                  {
                    item.testId.instituteName
          }
                </td>
              ),
              'Marks':
              (item)=>(
                <td>
                  {
                    item.overall.totalMarks
          }
                </td>
              ),
            

              'Username':
                (item)=>(
                  <td>
                    {
                   item.userId?.userName
                   }
                  </td>
                ),
                "View Analysis":(item)=>(
                  <td>
                  <CButton variant="outline" color="primary" 
                  size="sm" block onClick={()=>handleViewAnalysis(item._id)}>View Analysis</CButton>
                    
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

export default RecentTests
