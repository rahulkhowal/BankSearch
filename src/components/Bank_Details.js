import React,{useState,Fragment} from 'react'
import {NativeSelect} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import BankList from './Bank_List'
import TextField from '@material-ui/core/TextField'
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
      },
      parent:{
          flex:1,
          flexDirection:'row'
      },
      searchBox:{
          marginLeft:'70%',
          marginTop:'-57px'
      }
    }),
  );
const BankDetails=(props)=>{
    const classes = useStyles();
    const [city, setCity] = useState('');
    const [list,setList]= useState([ ])
    const [term,setTerm]=useState('')
    const [newtable,setNewtable]=useState([])
    const Api_Fetch = event => {
         console.log(event.target.value)
          setCity(event.target.value);
        let value=event.target.value
        console.log(city)
        if (JSON.parse(localStorage.getItem(value))) {
            setList(JSON.parse(localStorage.getItem(value)));
            console.log(`response from cache`);
            //setLoading(false);
          }else{
        
       axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${event.target.value}`,
        )
        .then(function (response) {
          console.log(response);
          //<Bank_List response={response}/>
          setList([...response.data])
          //setNewtable([...response.data])
          console.log(list)
          console.log(response.data)
          if (response.data.length > 0) {
            localStorage.setItem(value, JSON.stringify(response.data));
          }
  
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
      };
    const searchHandler = event => {
      
        /*if(event.target.value===undefined||''||null){
            setList([...newtable])
        }
        else{*/
        setTerm(event.target.value);
        console.log(term)
        let NewList=list
         NewList=NewList.filter(item=>{
            return item.bank_name.toLowerCase().search(
              term.toLowerCase()) !== -1;
          });
          console.log(NewList)
          setNewtable([...NewList])
        //}
      };
    
    
return(
  <Fragment>
   <div className={classes.parent}>
    <div >
        <NativeSelect
        id="customized-select-native"
         value={city}
         onChange={Api_Fetch}
         className={classes.menu}
        >
          <option value="null">Select City Name</option>
          <option value="DELHI">DELHI</option>
          <option value="MUMBAI">MUMBAI</option>
          <option value="CHENNAI">CHENNAI</option>
          <option value="DEHRADUN">DEHRADUN</option>
           <option value="KOLKATA">KOLKATA</option>

        </NativeSelect>
     </div>
      <div className={classes.searchBox}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Search by Bank Name"
            margin="normal"
            variant="outlined"
            onChange={searchHandler}
          />
        </div>
     </div>
        <BankList list_bank={list} filterList={newtable}/> 
      </Fragment> 
    )
}
export default BankDetails