import React from 'react'
import '../../assests/css/style.css'
import Header from './Header'

function Offers() {
    return (
        <>
        <Header />
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
                    <div className="pricingTable-signup">
                        <a href="#">Choose Plan</a>
                    </div>
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
                    <div className="pricingTable-signup">
                    <a href="#">Choose Plan</a>
                  </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="pricingTable blue">
                    <div className="pricingTable-header">
                        <i className="fa fa-diamond"></i>
                       <div className="price-value"> ₹999 <span className="month" style={{textDecoration:"line-through"}}>₹6000</span> </div>
                     </div>
                    <h3 className="heading">Premium</h3>
                    <div className="pricing-content">
                        <ul>
                           
                            <li>Unlimited Tests 250 +</li>
                            <li>OMR Confidence Analysis</li>
                            <li>Subject Wise Analysis</li>
                            <li>All India Rankings</li>                       
                             </ul>
                    </div>
                    <div className="pricingTable-signup">
                    <a href="#">Choose Plan</a>
                  </div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</>
    )
}

export default Offers
