import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// router
import { useNavigate } from 'react-router';

// components
import useAuth from '../../../../hooks/useAuth';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { changePasswordApi } from '../../../../apis/auth/AuthApi';


// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { user } = useAuth();
  const userId = user?.id;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const ChangePassWordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old Password is required'),
    new_password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      changePasswordApi({ userID: userId, ...methods.getValues() })
        .then((res) => {
          if(res?.data?.success){
            enqueueSnackbar(res?.data?.message, { variant: 'success' });
            navigate('/dashboard', { replace: true });
          }else{
            enqueueSnackbar(res?.data?.message, { variant: 'error' });
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err?.response?.data?.message, { variant: 'error' });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="old_password" type="password" label="Old Password" />

          <RHFTextField name="new_password" type="password" label="New Password" />

          <RHFTextField name="confirm_password" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
