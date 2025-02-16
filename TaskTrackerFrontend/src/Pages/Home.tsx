import React from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Grid2, Typography } from '@mui/material'

const Home = () => {
  return (
    <>
        <NavBar darkMode={true}/>
        <Grid2 width={"100%"} height={"100%"} border={"2px green solid"} display={"flex"} justifyContent={"center"}>
          <Grid2 height={"8vh"} p={2} width={"70vw"} border={"2px red solid"} >
              <Typography fontWeight={500} fontSize={40} >
                  Welcome to <span style={{color:"red"}} >Task Manager!! </span> Home :)
              </Typography>
          </Grid2>
        </Grid2>
        <Footer/>
    
    </>
  )
}

export default Home