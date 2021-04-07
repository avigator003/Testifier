import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Header from './HomeComponents/Header';
import ContactUs from './HomeComponents/ContactUs';


function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}


export default function Landing(props){
    const classes=useStyles()
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <>
        <Header/>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <ContactUs/>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    loginContainer:{
      padding:40,
      paddingTop:80
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
      }
  
  }));
  
