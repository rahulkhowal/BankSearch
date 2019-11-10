import React,{useState,useEffect} from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {Table,TableBody,Paper} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
const useStyles2 = makeStyles(theme => ({
    root: {
      width: '90%',
      marginTop: theme.spacing(3),
      marginLeft:'5%'
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    parent:{
      alignItems:'center'
    }
  }));
  
const FavouriteTab=(props)=>{
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [array_fav,setArray_fav]=useState([])
    
    useEffect(() => {
    const fetchFavourite = () => {
       const arr=Object.keys(localStorage)
       let i=arr.length
       const Values=[]
       while (i--) {
        if (
          arr[i] === "DELHI" ||
          arr[i] === "MUMBAI" ||
          arr[i] === "CHENNAI" ||
          arr[i] === "CHENNAI" ||
          arr[i] === "DEHRADUN"
        )
          continue;

          Values.push(JSON.parse(localStorage.getItem(arr[i])));
         
      }
      console.log(Values)
      setArray_fav([...Values])
      //console.log(array_fav)
    }
    fetchFavourite()       
      }, [])
    const handleUnFavourite=({row})=>{
          console.log(array_fav)
        console.log(row.ifsc)
        localStorage.removeItem(row.ifsc)
        const arr=array_fav.filter(cur=>{return cur.ifsc !==row.ifsc })
        console.log(arr)
        setArray_fav([...arr])
         
      } 
   
     const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }; 
    return(
      <div>
         <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
            <TableRow>
              <TableCell>
                  <h5>Favorite</h5>
              </TableCell>
              <TableCell>
                  <h5>Branch</h5>
              </TableCell>
              <TableCell>
                <h5>Bank Name</h5>
                </TableCell>
                <TableCell>
                   <h5>State</h5>
                </TableCell>
                <TableCell>
                <h5>Address</h5>
                </TableCell>
            </TableRow>
        </TableBody>
          <TableBody>
            {array_fav.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <FavoriteIcon style={{color:'red'}} onClick={()=>handleUnFavourite({row})}/>
                </TableCell>
                <TableCell >{row.branch}</TableCell>
                <TableCell >{row.bank_name}</TableCell>       
                <TableCell >{row.state}</TableCell>       
                <TableCell >{row.address}</TableCell> 
              </TableRow>    
            ))}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                colSpan={3}
                count={array_fav.length}
                rowsPerPage={rowsPerPage}
                page={page}
                
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          </Table>
          </div>
          </Paper>

      </div>
    )
}
export default FavouriteTab