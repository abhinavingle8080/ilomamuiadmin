import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card, Grid, Typography } from '@mui/material';

import { SELECT_STATUS } from '../../../../data/constants';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { FormBox, FormBottomButton } from '../../../../sections/@dashboard/user/form';
import { RHFSelect, FormProvider, RHFTextField, RHFDatePicker } from '../../../../components/hook-form';
import { getHolidayApi, updateHolidayApi, createHolidayApi } from '../../../../apis/holiday/HolidayApis';

HolidayForm.propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.object,
};

export default function HolidayForm({ isEdit, data }) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [selectedStatus, setSelectedStatus] = useState('Active');

    const HolidaySchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        date: Yup.date().required('Date is required'),
        description: Yup.string().required('Description is required'),
        // Add any additional validation rules for holiday fields
    });

    const defaultValues = useMemo(
        () => ({
            id: data?.id || '',
            name: data?.name || '',
            date: data?.date || new Date(),
            description: data?.description || '',
            status: !isEdit ? selectedStatus : data?.status || '',
        }),
        [data, isEdit, selectedStatus]
    );

    const methods = useForm({
        resolver: yupResolver(HolidaySchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (isEdit && data) {
            reset(defaultValues);
            if (data.status !== undefined && data.status !== null) {
                setSelectedStatus(data.status);
            }
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, data, defaultValues, reset]);

    const onSubmit = async (formData) => {
        try {
            if (isEdit) {
                await updateHolidayApi(formData);
                enqueueSnackbar('Holiday updated successfully', { variant: 'success' });
            } else {
                await createHolidayApi(formData);
                enqueueSnackbar('Holiday created successfully', { variant: 'success' });
            }
            navigate('/holidays');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography sx={{ p: 2 }} color='#FF4842' fontSize={13}>
                            All fields marked with * are mandatory
                        </Typography>
                        <form noValidate>
                            <FormBox>
                                <RHFTextField name="name" label="Name" required />

                                <RHFTextField name="date" label="Date" type="date" required />


                                <RHFTextField name="description" label="Description" required />

                            </FormBox>
                        </form>

                        <FormBottomButton
                            cancelButton="/holidays"
                            isSubmitting={isSubmitting}
                            isEdit={isEdit}
                        />
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
