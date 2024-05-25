import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
selectbutton : {
    border:'1px solid gold',
    borderRadius: 5,
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:'Montserrat',
    cursor:'pointer',
    width:'22%',
    // backgroundColor:selected ? "gold" : "",
    // color:selected? 700 : 500,
    "&:hover":{
        backgroundColor: 'gold',
        color:'black'
    },
    
}
}))
const SelectButton = ({children, selected, onClick}) => {


  const classes = useStyles()

  return (
    <span className={classes.selectbutton} onClick={onClick}>{children}</span>
  )
}

export default SelectButton