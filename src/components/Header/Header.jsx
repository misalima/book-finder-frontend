import './Header.css'
import React from 'react'
import { Box } from '@mui/material'
import { SearchBox } from '../SearchBox/SearchBox'
import logo from '../../resources/logo-svg.svg'
import { Account } from '../Account/Account'

export const Header = () => {
  return (
    <>
        <Box
            sx={{
                backgroundColor: '#22a39f',
            }}
        >
            <div className='header'>
                <div className='logo'><img src={logo} width={'120px'} alt='logo'></img></div>
                <SearchBox ></SearchBox>
                <Account></Account>
            </div>
        </Box>
    </>
  )
}
