import React from 'react'
import notFoundGif from 'assets/not-found.gif'
import { Typography } from '@mui/material'
const NotFound = () => {
  return (
    <div className='container h-center v-center column'>
        <img src={notFoundGif} alt="page not found" />
        <Typography variant='h6'>
            Страница не найдена
        </Typography>
    </div>
  )
}

export default NotFound