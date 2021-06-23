import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '@redux/rootReducer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TableSortLabel } from '@material-ui/core';
import EnhancedTableToolbar from '@components/EnhancedTableToolbar';
import tableFunctions, { Order } from '../utils/tableFunctions'
import { EWorkoutType } from '@redux/workout/workoutTypes';

interface Column {
  id: 'id' | 'distance' | 'date' | 'comment' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right'|'center'|'left';
}

const columns: Column[] = [
  { id: 'id', label: 'Id', minWidth: 50, align: 'center' },
  { id: 'distance', label: 'Distance', minWidth: 70, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
  { id: 'type',label: 'Type', minWidth: 100 , align: 'center'},
  { id: 'comment', label: 'Comment', align: 'center', minWidth: 200 },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface Data {
  id: number;
  distance: number;
  date: number;
  comment: string;
  type: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: 30
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const WorkoutListContainer: React.FC = () => {
  const { workoutDatas } = useSelector((state: TRootState) => state.workout);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');
  const [selected, setSelected] = useState<Data|null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (id: number) => {
    if (selected !== null && selected.id === id) {
      setSelected(null);
    } else {
      let newSelected: Data = workoutDatas.find(n => n.id === id);
      setSelected(newSelected);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (id: number) => selected !== null && selected.id === id;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, workoutDatas.length - page * rowsPerPage);

  const deleteWorkout = () => {
    dispatch({
      type: EWorkoutType.WORKOUT_ACHIEVE_REQUEST,
      payload: selected,
    });
  }

  const editWorkout = () => {
    router.push(`/workout/${selected.id}`);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar isSelected={selected !== null} deleteWorkout={deleteWorkout} editWorkout={editWorkout}  />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={workoutDatas.length}
            />
            <TableBody>
              {tableFunctions.stableSort(workoutDatas, tableFunctions.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(row.id)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" align="center" id={labelId} padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.distance}</TableCell>
                      <TableCell align="center">{new Date(row.date).toDateString()}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.comment}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={workoutDatas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WorkoutListContainer;
