import React ,{useState,useEffect} from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Header from './HomeComponents/Header';
import ContactUs from './HomeComponents/ContactUs';
import First from '../assests/images/First.jpg'
import Second from '../assests/images/Second.jpg'
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
import { getAllTestsGiven } from '../store/Actions';

function Item(props) {
    const classes = useStyles()
    return (
        <Paper>
            <img src={props.item.url} alt="" className={classes.image} />
        </Paper>
    )
}


export default function Landing(props) {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

    const [page, setPage] = useState(currentPage)
    const [testsData, setTestsData] = useState()
    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/users?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    useEffect(()=>{
        dispatch(
            getAllTestsGiven((err, response) => {
            console.log(response.testsGiven)
          var array=  response.testsGiven.sort(function(a, b) {
                return b.overall.totalMarks-a.overall.totalMarks
            });
            setTestsData(array)
          }))
      
      },[])
    var items = [
        {
            name: "Random Name #1",
            url: First
        },
        {
            name: "Random Name #2",
            url: Second
        }
    ]

    return (
        <>
            <Header />
            <Carousel className={classes.loginContainer}>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
      </>
    )
}

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        height: 620
    },

    backgroundImage: {
        height: "400px",
        width: "480px",
        [theme.breakpoints.down('sm')]: {
            height: "300px",
            width: "380px",

        },
        [theme.breakpoints.down('xs')]: {
            height: "300px",
            width: "380px",

        },

    },
    imageContainer: {

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"

    },
    input: {
        width: "100%",
        marginBottom: 15
    },
    button: {
        width: "100%",
        marginBottom: 15
    },
    image: {
        width: "100%",
        height: "500px",
    }

}));

