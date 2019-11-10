import React,{useState} from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavouriteTab from './Favourite_Tab';
import BankDetails from './Bank_Details'

const useStyles = makeStyles( Theme =>
  createStyles({
    menu: {
     width:'20%',
     marginTop:'5%',
     marginLeft:'8%'
    },
    root:{
      width:'40%',
      marginLeft:'40%'
    }
  }),
);
const SelectMenu=()=>{
    const classes = useStyles();
    const [value,setValue]=useState(0)
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    return(
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" classes={{root:classes.root}}>
          <Tab label="Bank Details"  />
          <Tab label="Favourite"  />
          </Tabs>
          {value === 0 && <BankDetails />}
           {value === 1 && <FavouriteTab />}


   </div> 
    )
}
export default SelectMenu