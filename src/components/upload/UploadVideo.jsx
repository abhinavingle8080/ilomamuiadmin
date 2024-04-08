import { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { Box, Button, TextField, IconButton, } from '@mui/material';

import Iconify from '../iconify/iconify';

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
    fileInputButton: {
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    fileInput: {
        display: 'none',
    },
}));

VideoInputField.propTypes = {
    sx: PropTypes.object,
};

export default function VideoInputField({ sx }) {
    const classes = useStyles();
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleClearFile = () => {
        setFile(null);
        setFileName('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                ...sx,
            }}
        >
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter video URL or upload a file"
                value={fileName}
                InputProps={{
                    readOnly: true,
                }}
            />

            {file && (
                <IconButton color="error" sx={{ marginLeft: '10px' }} onClick={handleClearFile}>
                    <Iconify icon={'carbon:close'} />
                </IconButton>
            )}

            <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} />

            <label htmlFor="video-upload">
                <Button
                    variant="text"
                    component="span"
                    startIcon={<Iconify icon={'carbon:upload'} />}
                    className={classes.fileInputButton}
                >
                    Upload
                </Button>
                <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    className={classes.fileInput}
                    onChange={handleFileChange}
                />
            </label>
        </Box>
    );
}
