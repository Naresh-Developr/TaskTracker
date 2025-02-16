import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { Box, Grid2, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'


const Home = () => {
  const role = useSelector((state:RootState) => state.auth.role);
  const [CurrentTime,setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Update time every second
    console.log("jj");
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "hh:mm:ss a"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
        <NavBar darkMode={true}/>
        <Grid2 width={"100%"} height={"100%"} border={"2px #888 solid"} borderRadius={5} display={"flex"} justifyContent={"center"}>
          <Grid2 height={"100%"} width={"100%"} p={2}  >
              {role=="admin" ? (
                <Typography fontWeight={500}  fontSize={100}  >
                Welcome to <span style={{color:"red"}} >Task Admin!! </span> Home :)
            </Typography>
              ):(
                <Box display={"flex"} justifyContent={"space-between"}>
                <Typography fontWeight={500} fontSize={70} >
                  Welcome Home,<br/> <span style={{color:"red"}} >Admin </span>
              </Typography>
                <Typography fontWeight={500} fontSize={70} >
                    <span style={{color:"red"}} > {CurrentTime} </span>
                </Typography>
                </Box>
              )}
          </Grid2>
        </Grid2>
        <Footer/>
    </>
  );
  // const role = useSelector((state: RootState) => state.auth.role);

  // return (
  //   <div>
  //     {role === "Admin" ? (
  //       <h1>Hello Admin</h1>
  //     ) : (
  //       <h1>Hello User</h1>
  //     )}
  //   </div>
  // );

}

export default Home