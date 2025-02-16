import { Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack width={"99%"} height={33}  position={"absolute"} bottom={0}>
        <Typography alignSelf={"center"} fontSize={13} color='grey'>
            Copyrights @vera yaru naanga tha
        </Typography>
    </Stack>
  )
}

export default Footer