import React, { useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as api from '../store/admin-helper';
import '../css/mainView.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 870
  },
});


export default function Orders() {
  const [rows, setRows] = React.useState([])
  useLayoutEffect(() => {
    let date = new Date();
    let newDate = dateChange(date);
    let a = api.getOrdersForDate(newDate);
    a.then((res) => {
        populateData(res)
    });
  }, []);

  function populateData(data) {
    setRows(data)
      // rows = data;
      console.log(rows)
  }

  const classes = useStyles();

  function dateChange(date) {
    let month = JSON.stringify(date.getUTCMonth() + 1);
    let day = JSON.stringify(date.getUTCDate());
    let year = JSON.stringify(date.getUTCFullYear());
    if (month.length == 1) {
      month = '0' + month;
    }
    if (day.length == 1) {
      day = '0' + day;
    }
    let newdate = year + '-' + month + '-' + day;
    return newdate;
  }
  return (
    <TableContainer className="table-wrap" component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Broj porudzbine</TableCell>
            <TableCell align='right'>Ime korisnika</TableCell>
            <TableCell align='right'>Jelo</TableCell>
            <TableCell align='right'>Količina</TableCell>
            <TableCell align='right'>Datum porudzbine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.order_id}>
              <TableCell component='th' scope='row'>
                {row.order_id}
              </TableCell>
              <TableCell align='right'>{row.client.name}</TableCell>
              <TableCell align='right'>{row.meal.name}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
              <TableCell align='right'>{row.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
