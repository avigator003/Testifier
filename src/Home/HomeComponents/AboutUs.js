import React from 'react'
import Header from './Header'

function AboutUs() {
    return (
        <>
            <Header/>
            
        <div style={{padding:60,paddingTop:150}}>
            <h1 style={{marginBottom:20,textDecoration:"underline",padding:10}}>ABOUT US</h1>
 <p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>Thanks for visiting the page. I am really excited to know that you are interested in RapidIAS.</p>
<p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>RapidIAS aims to revolutionize the way student prepares for a competitive examination. Providing an OMR for the tests is just the beginning.</p>
<p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>&nbsp;</p>
<p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>Rapid IAS aims to strive towards decreasing the hurdles faced by students in preparing for UPSC. It will soon be launching variety of products based on the below listed hurdles.</p>
<ol style={{listStyleType: "decimal"}}>
    <li>Solving <strong>test papers</strong> at home is a pain when you can&rsquo;t analyze your paper properly.</li>
    <li>So much of content but very less of retention.<ol style={{listStyleType: "lower-alpha"}}>
            <li>Our product on this would be based on years of experience and scientific backings.</li>
            <li>It will use <strong>algorithms</strong> based on <strong>Pareto Principle, Spaced Repetition and Feynman technique</strong>.</li>
        </ol>
    </li>
    <li>In years of preparation one looses the track of time and the whole process becomes very monotonous.<ol style={{listStyleType: "lower-alpha"}}>
            <li>Our algorithms will help you find like minded and equivalent caliber students to rapidly boost your preparation. &nbsp;</li>
        </ol>
    </li>
</ol>
<p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>&nbsp;</p>
<p style={{margin:0,fontSize:"16px",fontFamily:"Calibri,sans-serif"}}>If you have read through till here then please drop a message to at telegram - @RapidIAS_in_admin about the feedback of the website and if you have some innovative idea to smoothen the preparation.</p>

 
        </div>
        </>
    )
}

export default AboutUs
