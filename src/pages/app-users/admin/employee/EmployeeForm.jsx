import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState , useEffect, } from 'react';

// @mui
import { Card, Grid, Typography } from '@mui/material';

// components
import { SELECT_STATUS } from '../../../../data/constants';
import { FormBox, FormBottomButton } from '../../../../sections/@dashboard/user/form';
import { RHFSelect, FormProvider,  RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

EmployeeForm.propTypes = {
    isEdit: PropTypes.bool,
    data: PropTypes.object,
};

export default function EmployeeForm({ isEdit, data }) {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('Active');
    const [selectedLevels, setSelectedLevels] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const RoleSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        level_ids: Yup.array().min(1, 'Minimum 1 level should be selected').required('Levels is required'),
    });

    const defaultValues = useMemo(
        () => ({
            grade_id: data?.id || '',
            name: data?.name || '',
            level_ids: data?.Levels?.map((item) => item?.id) || [],
            status: !isEdit ? selectedStatus : data?.status || '',
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
            if (data.status !== undefined && data.status !== null) {
                setSelectedStatus(data.status);
            }
            if (data?.Levels?.length > 0) {
                setSelectedLevels(data?.Levels?.map((item) => ({ label: item?.level, value: item?.id })));
                const levelIds = data?.Levels?.map((item) => item?.id);
                setValue('level_ids', levelIds);
            }
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, data]);

    const onSubmit = async () => {
        try {
            if (isEdit) {
                console.log('edit');
            } else {
                console.log('else');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formClear = () => {
        if (isEdit) {
            reset(defaultValues);
            setSelectedStatus(data?.status);
            setSelectedLevels(data?.Levels?.map((item) => ({ label: item?.level, value: item?.id })));
            const levelIds = data?.Levels?.map((item) => item?.id);
            setValue('level_ids', levelIds);
        } else {
            reset();
            setSelectedStatus('Active');
            setSelectedLevels([]);
        }
    };

    const handleSelectLevels = (e) => {
        setSelectedLevels(e);
        const levelIds = e?.map((item) => item?.value);
        setValue('level_ids', levelIds);
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

                                
                                <RHFSelect
                                    name="status"
                                    label="Status"
                                    placeholder="Status"
                                    value={selectedStatus}
                                    onChange={(e) => handleChange(e, 'status', setSelectedStatus)}
                                >
                                    {Object.entries(SELECT_STATUS).map(([key, value]) => (
                                        <option key={key} value={value}>
                                            {key}
                                        </option>
                                    ))}
                                </RHFSelect>
                            </FormBox>
                        </form>

                        <FormBottomButton
                            cancelButton="/employees"
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