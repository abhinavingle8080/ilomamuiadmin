import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import { styled, FormHelperText } from '@mui/material';

// type
import UploadVideo from '../upload/UploadVideo';
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from '../upload';

// ----------------------------------------------------------------------

const StyledUploadAvatar = styled(UploadAvatar)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFUploadAvatar.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadAvatar({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <div>
                        <StyledUploadAvatar error={checkError} {...other} file={field.value} />
                        {checkError && (
                            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                {error.message}
                            </FormHelperText>
                        )}
                    </div>
                );
            }}
        />
    );
}

// ----------------------------------------------------------------------

const StyledUploadSingleFile = styled(UploadSingleFile)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFUploadSingleFile.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadSingleFile({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <StyledUploadSingleFile
                        accept="image/*"
                        file={field.value}
                        error={checkError}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    );
}

// ----------------------------------------------------------------------

const StyledUploadVideo = styled(UploadVideo)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFUploadSingleVideo.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadSingleVideo({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && !field.value;

                return (
                    <StyledUploadVideo
                        accept="video/*"
                        file={field.value}
                        error={checkError}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    );
}

// ----------------------------------------------------------------------

const StyledUploadMultiFile = styled(UploadMultiFile)(() => ({
    '& .MuiInputLabel-asterisk': {
        color: 'red',
    },
}));

RHFUploadMultiFile.propTypes = {
    name: PropTypes.string,
};

export function RHFUploadMultiFile({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const checkError = !!error && field.value?.length === 0;

                return (
                    <StyledUploadMultiFile
                        accept="image/*"
                        files={field.value}
                        error={checkError}
                        helperText={
                            checkError && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error?.message}
                                </FormHelperText>
                            )
                        }
                        {...other}
                    />
                );
            }}
        />
    );
}
