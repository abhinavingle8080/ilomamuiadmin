import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const RHFUploadVideo = styled(Button)(({ error }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    color: 'grey',
    fontWeight: 'normal',
    padding: '10px',
    height: '55px',
    width: '100%',
    borderColor: error ? 'red' : 'lightgrey',
    '&:hover': {
        backgroundColor: 'white',
        borderColor: error ? 'red' : 'black',
    },
    '&.MuiButtonBase-root': {
        '&:hover': {
            backgroundColor: 'inherit',
        },
    },
}));

export default RHFUploadVideo;
