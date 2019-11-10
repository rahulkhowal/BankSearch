import React from 'react'
import {AppBar,Toolbar,Typography} from'@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles( Theme =>
  createStyles({
    parent: {
      alignItems:'center',
      justifyContent:'center'
    },
  }),
);

const Header=()=>{
  const classes = useStyles();
    return(
        <AppBar position="static" >
             <Toolbar className={classes.parent}>
               <Typography variant="h4" >Bank Search Application</Typography>
             </Toolbar>
       </AppBar>
    )
}
export default Header