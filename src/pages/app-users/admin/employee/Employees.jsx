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

// apis
import { getEmployeesApi } from 'src/apis/employee/EmployeeApis';

// Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../../../../sections/user/table-no-data';
import UserTableRow from '../../../../sections/user/user-table-row';
import UserTableHead from '../../../../sections/user/user-table-head';
import TableEmptyRows from '../../../../sections/user/table-empty-rows';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import UserTableToolbar from '../../../../sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../../../sections/user/utils';
// ----------------------------------------------------------------------

export default function Employees() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [count, setCount] = useState(0);

  const [employees, setEmployees] = useState([]);

  const [payload, setPayload] = useState({
    page: 1,
    limit: 5,
    search: '',
  });

  useEffect(
    () => {
      getEmployeesApi(payload)
        .then((res) => {
          setEmployees(res.data.data.rows);
          setCount(res.data.data.count);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.name);
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
      search: event.target.value,
    });
  };

  const dataFiltered = applyFilter({
    inputData: employees,
    comparator: getComparator(order, orderBy),
    filterName: payload.search,
  });

  const notFound = !dataFiltered.length && !payload.search;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <HeaderBreadcrumbs
          heading="Employee"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Employee', href: '/employees' },
            { name: 'Employee List' },
          ]}
        />
        <Button
              variant="contained"
              to="/employees/add"
              component={RouterLink}
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Employee
            </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={payload.search}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={count}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'role', label: 'Role' },
                  { id: 'joiningDate', label: 'Joining Date', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  // .slice((payload.page - 1) * rowsPerPage, (payload.page - 1) * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={`${row.first_name} ${row.last_name}`}
                      role={row.role}
                      status="Pending"
                      email={row.email}
                      avatarUrl={row.avatarUrl}
                      joiningDate={moment(row.created_at).format('DD/MM/YYYY')}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEdit='employees/edit'
                      onView='employees/view'
                      onDelete='employees/delete'
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
