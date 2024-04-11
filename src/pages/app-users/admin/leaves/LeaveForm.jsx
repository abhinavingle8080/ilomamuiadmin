import dayjs from 'dayjs';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Card,
  Grid,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

// components
import '../../../../assets/css/PhoneInput.css';
import moment from 'moment';
import { FormBox, FormBottomButton } from '../../../../sections/@dashboard/user/form';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { createLeaveApi, updateLeaveApi } from '../../../../apis/leave/LeaveApis';
import { getHolidaysNoPaginationApi } from '../../../../apis/holiday/HolidayApis';

// ----------------------------------------------------------------------

LeaveForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.object,
};

const StyledDatePicker = styled(DatePicker)(() => ({
  '& .MuiInputLabel-asterisk': {
    color: 'red',
  },
}));

export default function LeaveForm({ isEdit, data }) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [holidays, setHolidays] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const RoleSchema = Yup.object().shape({
    employee_id: Yup.string().required('Employee is required'),
    start_date: Yup.string().required('Start date is required'),
    end_date: Yup.string().required('End date is required'),
    reason: Yup.string().required('Reason is required'),
  });

  const defaultValues = useMemo(
    () => ({
      leave_id: data?.id || '',
      employee_id: data?.employee_id ? data?.employee_id : '',
      start_date: data?.start_date ? dayjs(data?.start_date) : null,
      end_date: data?.end_date ? dayjs(data?.end_date) : null,
      reason: data?.reason || '',
      remark: data?.remark || '',
      status: !isEdit ? selectedStatus : data?.status || 'Pending',
      leaveDays: data?.leaveDays || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const getHolidays = () => {
    getHolidaysNoPaginationApi()
      .then((res) => {
        setHolidays(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e, name, state) => {
    state(e.target.value);
    setValue(name, e.target.value);
  };

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && data) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, data]);

  const onSubmit = async () => {
    try {
      if (isEdit) {
        await updateLeaveApi(values)
          .then((res) => {
            enqueueSnackbar(res?.data?.message);
            formClear();
            navigate('/leaves');
          })
          .catch((err) => {
            console.error(err);
            enqueueSnackbar(err?.response?.data?.message, { variant: 'error' });
          });
      } else {
        await createLeaveApi(values)
          .then((res) => {
            enqueueSnackbar(res?.data?.message, { variant: 'success' });
            formClear();
            navigate('/leaves');
          })
          .catch((err) => {
            console.error(err);
            enqueueSnackbar(err?.response?.data?.message, { variant: 'error' });
          });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    }
  };

  const formClear = () => {
    if (isEdit) {
      reset(defaultValues);
    } else {
      reset();
    }
  };

  useEffect(
    () => {
      const calculateLeaveDays = async () => {
        if (values.start_date && values.end_date) {
          const startDate = moment(values.start_date);
          const endDate = moment(values.end_date);
          const daysData = [];

          let currentDate = startDate;
          const calculateDay = () => {
            console.log('current date', currentDate.format('YYYY-MM-DD'));
            const isSunday = currentDate.day() === 0;
            const isHoliday = holidays.some((holiday) =>
              moment(holiday.date).isSame(currentDate, 'day')
            );

            return {
              date: currentDate.format('YYYY-MM-DD'),
              dayName: currentDate.format('dddd'),
              selectedOption: 'FullDay',
              is_holiday: isHoliday || isSunday,
            };
          };

          while (currentDate.isSameOrBefore(endDate)) {
            daysData.push(calculateDay());
            currentDate = (currentDate).add(1, 'day');
          }
          setValue('leaveDays', daysData);
        }
      };
      calculateLeaveDays();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.start_date, values.end_date]
  );

  const getHolidayName = (date) => {
    const holiday = holidays.find((day) => moment(day.date).format('YYYY-MM-DD') === date);
    return holiday ? holiday.name : 'Sunday';
  };

  // console.log('generated leave days', values.leaveDays);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography sx={{ p: 2 }} color="#FF4842" fontSize={13}>
              All fields marked with * are mandatory
            </Typography>
            <form noValidate>
              <FormBox>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker
                    label="Start Date"
                    name="start_date"
                    value={values?.start_date}
                    onChange={(e) => {
                      setValue('start_date', e);
                    }}
                    format="YYYY-MM-DD"
                    // minDate={dayjs().add(1, 'day')}
                    slotProps={{
                      textField: {
                        helperText: errors.start_date ? errors.start_date.message : null,
                        error: Boolean(errors.start_date),
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker
                    label="End Date"
                    name="end_date"
                    value={values?.end_date}
                    onChange={(e) => {
                      setValue('end_date', e);
                    }}
                    format="YYYY-MM-DD"
                    // minDate={dayjs().add(1, 'day')}
                    slotProps={{
                      textField: {
                        helperText: errors.end_date ? errors.end_date.message : null,
                        error: Boolean(errors.end_date),
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {values?.leaveDays.map((day, index) => (
                        <TableRow key={index}>
                          <TableCell>{day.date}</TableCell>
                          <TableCell>{day.dayName}</TableCell>
                          <TableCell>
                            {day.is_holiday ? (
                              <p>Holiday: {getHolidayName(day.date)}</p>
                            ) : (
                              <p>{day.selectedOption}</p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* <RHFTextField name="name" label="Name" required /> */}
              </FormBox>
            </form>

            <FormBottomButton
              cancelButton="/holidays"
              onClear={() => formClear()}
              isSubmitting={isSubmitting}
              isEdit={isEdit}
            />
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
