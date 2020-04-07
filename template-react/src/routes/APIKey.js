import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import APIKeyAddDialog from '../components/dialog/APIKeyAdd';
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }
  }),
)(TableCell);
const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 6),
  },
  tableContainer: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(5)
  }
}));
const APIKey = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [apiKeyList, setAPIKeyList] = useState([]);
  useEffect(() => {
    getAPIKeyList();
  }, []);
  async function getAPIKeyList ()  {
    try{
      const res = await axios.get('/apikey');
      setAPIKeyList(res.data.apiKeyList);
      console.log('[Post] /apikey', res.data.message);
    }catch(error){
      console.log(error);
    }
  }
  const handleClickCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
          API Key
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Get API key to use API.
        </Typography>
      </Container>
      <Button variant="contained" color="primary" className={classes.button} onClick ={handleClickOpenDialog}>Add new key</Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '15%' }}>Name</StyledTableCell>
              <StyledTableCell style={{ width: '30%' }}>Domain</StyledTableCell>
              <StyledTableCell style={{ width: '40%' }}>Key</StyledTableCell>
              <StyledTableCell style={{ width: '15%' }}>Expired Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiKeyList.map((apiKey) => (
              <StyledTableRow key={apiKey.name}>
                <StyledTableCell component="th" scope="row">{apiKey.name}</StyledTableCell>
                <StyledTableCell >{apiKey.domain}</StyledTableCell>
                <StyledTableCell>{apiKey.key}</StyledTableCell>
                <StyledTableCell >{apiKey.expiredDate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog
      ?<APIKeyAddDialog handleClickCloseDialog = {handleClickCloseDialog}/>
      :null}
    </div>
  )
}

export default APIKey;