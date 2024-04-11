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
import { Card, Grid, styled, Typography } from '@mui/material';

// components
import '../../../../assets/css/PhoneInput.css';
import moment from 'moment';
import { FormBox, FormBottomButton } from '../../../../sections/@dashboard/user/form';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { createHolidayApi, updateHolidayApi } from '../../../../apis/holiday/HolidayApis';

// ----------------------------------------------------------------------

EmployeeForm.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.object,
};

const StyledDatePicker = styled(DatePicker)(() => ({
  '& .MuiInputLabel-asterisk': {
    color: 'red',
  },
}));

export default function EmployeeForm({ isEdit, data }) {
  const navigate = useNavigate();
  const [maxDescriptionChar, setMaxDescriptionChar] = useState(200);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.string().required('Date is required'),
    description: Yup.string().test(
      'len',
      `Description must be less than ${maxDescriptionChar} characters`,
      (val) => {
        if (val && val.length === maxDescriptionChar) {
          return false;
        }
        return true;
      }
    ),
  });

  const defaultValues = useMemo(
    () => ({
      holiday_id: data?.id || '',
      name: data?.name || '',
      date: data?.date ? dayjs(data?.date) : null,
      description: data?.descripion || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

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
        await updateHolidayApi(values)
          .then((res) => {
            enqueueSnackbar(res?.data?.message);
            formClear();
            navigate('/holidays');
          })
          .catch((err) => {
            console.error(err);
            enqueueSnackbar(err?.response?.data?.message, { variant: 'error' });
          });
      } else {
        await createHolidayApi(values)
          .then((res) => {
            enqueueSnackbar(res?.data?.message, { variant: 'success' });
            formClear();
            navigate('/holidays');
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

  const handleDescriptionChange = (event) => {
    const newText = event.target.value;

    if (newText.length <= maxDescriptionChar) {
      setDescriptionLength(event.target.value.length);
      setValue('description', newText);
    }
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text/plain');
    const totalText = pastedText.length + values.description.length;
    if (totalText > maxDescriptionChar) {
      event.preventDefault();
    }
  };

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
                <RHFTextField name="name" label="Name" required />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker
                    label="Date"
                    name="date"
                    value={values?.date}
                    onChange={(e) => {
                      setValue('date', e);
                    }}
                    format="YYYY-MM-DD"
                    // minDate={dayjs().add(1, 'day')}
                    slotProps={{
                      textField: {
                        helperText: errors.date ? errors.date.message : null,
                        error: Boolean(errors.date),
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <RHFTextField
                      name="description"
                      label="Description"
                      required
                      multiline
                      rows={3}
                      onChange={(e) => handleDescriptionChange(e)}
                      onPaste={handlePaste}
                    />
                    {errors.description || descriptionLength === 0 ? null : (
                      <p>
                        {descriptionLength}/{maxDescriptionChar}
                      </p>
                    )}
                  </Grid>
                </Grid>
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
