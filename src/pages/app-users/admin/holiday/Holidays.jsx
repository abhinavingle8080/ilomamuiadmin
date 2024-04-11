// library
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// apis - assuming you have a similar API function for getting holidays
import { getHolidaysApi ,deleteHolidayApi  } from 'src/apis/holiday/HolidayApis';

// Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../../../../sections/products/table-no-data';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import HolidayTableRow from '../../../../sections/products/user-table-row';
import TableEmptyRows from '../../../../sections/products/table-empty-rows';
import HolidayTableHead from '../../../../sections/products/user-table-head';
import HolidayTableToolbar from '../../../../sections/products/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../../../sections/user/utils';
// ----------------------------------------------------------------------

export default function Holidays() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [holidays, setHolidays] = useState([]);
  const [payload, setPayload] = useState({
    page: 1,
    limit: 5,
    search: '',
  });

  useEffect(() => {
    getHolidaysApi(payload)
      .then((res) => {
        setHolidays(res.data.data.rows);
        setCount(res.data.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [payload]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = holidays.map((holiday) => holiday.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPayload({
      ...payload,
      page: newPage + 1,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPayload({
      ...payload,
      limit: parseInt(event.target.value, 10),
    });
  };

  const handleFilterByName = (event) => {
    setPayload({
      ...payload,
      page: 1,
      // limit: 5,
      search: event.target.value,
    });
  };
  const dataFiltered = applyFilter({
    inputData: holidays,
    comparator: getComparator(order, orderBy),
    filterName: payload.search,
  });

  const notFound = !dataFiltered.length && !payload.search;


  const handleDelete = (id) => {
    console.log('Deleting holiday with ID:', id);
    deleteHolidayApi(id)
      .then(() => {
        setHolidays(holidays.filter((holiday) => holiday.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting holiday:', error);
      });
  };
  

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <HeaderBreadcrumbs
          heading="Holiday"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Holidays', href: '/holidays' },
            { name: 'Holiday List' },
          ]}
        />
        <Button
          variant="contained"
          to="/holidays/add"
          component={RouterLink}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Holiday
        </Button>
      </Stack>

      <Card>
        <HolidayTableToolbar
          numSelected={selected.length}
          filterName={payload.search}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <HolidayTableHead
                order={order}
                orderBy={orderBy}
                rowCount={count}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'date', label: 'Date' },
                  { id: 'description', label: 'Description' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((holiday) => (
                  <HolidayTableRow
                  // key={holiday.id}
                  name={holiday.name}
                    date={moment(holiday.date).format('DD/MM/YYYY')}
                    description={holiday.description}
                    selected={selected.indexOf(holiday.name) !== -1}
                    handleClick={(event) => handleClick(event, holiday.name)}
                    onEdit={`/holidays/${holiday.id}/edit`}
                    onView={`/holidays/${holiday.id}/view`}
                    onDelete={() => handleDelete(holiday.id)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(payload.page - 1, rowsPerPage, count)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={payload.page - 1}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
