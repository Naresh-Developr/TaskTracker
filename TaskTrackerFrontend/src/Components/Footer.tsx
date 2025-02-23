import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack width={"99%"} height={33}  position={"sticky"} bottom={-1}>
        <Typography alignSelf={"center"} fontSize={13} color='grey'>
            Copyrights @vera yaru naanga tha
        </Typography>
    </Stack>
  )
}

export default Footer