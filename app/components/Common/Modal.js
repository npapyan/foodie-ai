import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2c2c2c',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ title, body, open, onClose }) {
    return (
        <div style={{ display: 'inline' }}>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: 'center'}}>
                        {title}
                    </Typography>
                    <div id="modal-modal-description" style={{marginTop: '1rem'}}>
                        {body}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        sx={{mt: 2}}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
