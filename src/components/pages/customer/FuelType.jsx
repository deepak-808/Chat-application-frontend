import {
  // FormControl, InputLabel, MenuItem, Select,
  TableHead, TableSortLabel, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '../../../config';
import moment from 'moment';
import Loading from '../../Layout/Loading';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
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
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(_id, name, status, carImage, createdAt, updatedAt, isDeleted) {
  return { _id, name, status, carImage, createdAt, updatedAt, isDeleted };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Fuel Type',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Created Date',
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
const FuelType = () => {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  // const [carBrand, setCarBrand] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    const getCarModelData = async () => {
      try {
        // if (carBrand !== '') {
          const response = await axios.get(`${API_URL}car/Fueltype`);
          const data = await response.data;
          const cars = data.data.cars;
          console.log('first', cars)
          const mappedData = cars.map(item => createData(
            item._id,
            item.name,
            item.status,
            item.Image,
            item.createdAt,
            item.updatedAt,
            item.isDeleted
          ));
          setLoading(false);
          setRows(mappedData);
  
        // }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    getCarModelData();
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const CheckStatus =  (row) => {
    return row.status === 1 ? <Typography color="primary" fontSize={12}>Active</Typography> : <Typography fontSize={12} color="red">Inactive</Typography>
  }
  // const fetchCarsBrand = async () => {
  //   try {
  //     let response = await axios.get(`${API_URL}car/cars`)
  //     const cars = response.data.data.cars;
  //     if (response) {
  //       setCars(cars)
  //     }
  //   }
  //   catch (e) {
  //     console.log("Error: " + e);
  //   }
  // }
  // useEffect(() => {
  //   fetchCarsBrand();
  // }, [])
  // const handleChange = (event) => {
  //   setCarBrand(event.target.value);
  // };
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ color: 'var(--primary)', marginBottom: 8 }} className="d-flex">
        <Typography variant="h5">Fuel Type</Typography>
        <Typography onClick={() => navigate('/car/fuels-type/add')} className='ms-auto cursor-pointer'>Add Fuel Type <IoIosAddCircleOutline size='20px'/></Typography>
      </Box>
      {/* <FormControl className='w-25 mb-4'>
        <InputLabel id="demo-simple-select-label">Car Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={carBrand}
          label="Car Brand"
          onChange={handleChange}
        >
          {cars.map((item) => (
            <MenuItem value={item?._id} key={item?._id}>{item?.name}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <>
    {loading ? <Loading/> : (
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
              {rows.length > 0 ? (
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          <CheckStatus  status={row.status} />
                        </TableCell>
                        <TableCell align='right'>{moment(row.createdAt).format("MMM Do YY")}</TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          <img style={{ width: 30, height: 30 }} src={row.carImage} alt='img' />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody >
                <TableCell width="100%">
                    <Typography variant="body1" align="center" sx={{ p: 2 }}>No data available</Typography>
                </TableCell>
              </TableBody>
            </Table>
        )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )}
    </>
    </Box>

  )
}

export default FuelType;

