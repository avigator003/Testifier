import React ,{useState,useEffect}from 'react'
import '../../assests/css/style.css'
import Header from './Header'
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Qr from '../../assests/images/qrcode.jpeg'
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import ModalBackground from '../../assests/images/background.png'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        borderRadius: 20,
        height: 400,
        width: 480,
        outline: "none",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundImage: `url(${ModalBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 40,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            height: "250px",
            width: "250px",

        },

    },
    
}))
function Offers() {
    const [open,setOpen]=useState(false)
    const classes=useStyles()
   
    return (
        <div>
        <Header />

        <Modal
        aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper1}>
                        <h2 id="transition-modal-title" className={classes.modalHeading}>UNLOCK TESTS</h2>
                        <p id="transition-modal-description"> Scan QR Code to Pay </p>
                      <img src={Qr} style={{height:250,width:250}}/>
                       <Link to="/givetest" style={{ textDecoration: "none" }}>
                            <CButton shape="pill" color="success" className={classes.whatsappButton} >
                                Back to Home
                            </CButton>
                        </Link>


                    </div>
                </Fade>
            </Modal>
         
         
        <div className="demo" >
    <div className="container">
        <div className="row">
            <div className="col-md-4 col-sm-6">
                <div className="pricingTable">
                    <div className="pricingTable-header">
                        <i className="fa fa-adjust"></i>
                        <div className="price-value"> ₹100 <span className="month" style={{textDecoration:"line-through"}}>₹200</span> </div>
                    </div>
                    <h3 className="heading">Bronze Member</h3>
                    <div className="pricing-content">
                        <ul>
                            <li>Any 3 Tests</li>
                            <li>OMR Confidence Analysis</li>
                            <li>Subject Wise Analysis</li>
                            <li>All India Rankings</li>
                        </ul>
                    </div>
                        <button onClick={()=>setOpen(true)} style={{outline:"none",border:"none",backgroundColor:"transparent"}} className="pricingTable-signup">
                      <a href="#">  Choose Plan</a>
                        </button>
                    
                </div>
            </div>

            <div className="col-md-4 col-sm-6">
                <div className="pricingTable green">
                    <div className="pricingTable-header">
                        <i className="fa fa-briefcase"></i>
                        <div className="price-value"> ₹300 <span className="month" style={{textDecoration:"line-through"}}>₹1500</span> </div>
                    </div>
                    <h3 className="heading">Silver Member</h3>
                    <div className="pricing-content">
                        <ul>
                            <li>Any 10 Tests</li>
                            <li>OMR Confidence Analysis</li>
                            <li>Subject Wise Analysis</li>
                            <li>All India Rankings</li>                        
                            </ul>
                    </div>
                    <button onClick={()=>setOpen(true)} style={{outline:"none",border:"none",backgroundColor:"transparent"}} className="pricingTable-signup">
                      <a href="#">  Choose Plan</a>
                        </button>
                    
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="pricingTable blue">
                    <div className="pricingTable-header">
                        <i className="fa fa-diamond"></i>
                       <div className="price-value"> ₹999 <span className="month" style={{textDecoration:"line-through"}}>₹6000</span> </div>
                     </div>
                    <h3 className="heading">Gold Member</h3>
                    <div className="pricing-content">
                        <ul>
                           
                            <li>Unlimited Tests 250 +</li>
                            <li>OMR Confidence Analysis</li>
                            <li>Subject Wise Analysis</li>
                            <li>All India Rankings</li>                       
                             </ul>
                    </div>
                    <button onClick={()=>setOpen(true)} style={{outline:"none",border:"none",backgroundColor:"transparent"}} className="pricingTable-signup">
                      <a href="#">  Choose Plan</a>
                        </button>
                    
                </div>
            </div>
            
        </div>
    </div>
</div>
<div style={{padding:30,paddingLeft:80,paddingRight:80}}>
    <p style={{fontWeight:"bold"}}>Disclaimer: Our platform provides you OMR based exam environment and Micro analysis based on your inputs.  We don't provide test papers of various institutes. We just provide the link to the papers that is already publicly available at various platforms. 
</p>
</div>
</div>
    )
}

export default Offers
