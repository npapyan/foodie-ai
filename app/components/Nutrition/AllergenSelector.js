import * as React from 'react';
import { useState } from 'react';
import { Modal, Box, Typography, Checkbox, FormControlLabel, TextField,
    Button, List, ListItem, IconButton, Tooltip, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2c2c2c',
    color: '#ffffff',
    boxShadow: 24,
    p: 4,
};

const textFieldStyle = {
    '& .MuiInputBase-root': {
        color: '#ffffff',
    },
    '& .MuiInputLabel-root': {
        color: '#ffffff',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffff',
    },
};

function AllergenSelector({ allergens, setAllergens }) {
    const [open, setOpen] = useState(false);
    const [newAllergen, setNewAllergen] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setErrorMessage('');
        setSuccessMessage('');
    };
    const handleClose = () => setOpen(false);

    const handleCheckboxChange = (index) => {
        const newAllergens = [...allergens];
        newAllergens[index].checked = !newAllergens[index].checked;
        setAllergens(newAllergens);
    };

    const handleAddAllergen = () => {
        if (newAllergen.trim() && !allergens.some(allergen => allergen.name.toLowerCase() === newAllergen.toLowerCase())) {
            setAllergens([...allergens, { name: newAllergen, checked: false }]);
            setNewAllergen('');
            setErrorMessage('');
            setSuccessMessage('Allergen added successfully!');
        } else {
            setErrorMessage('This allergen is already in the list.');
            setSuccessMessage('');
        }
    };

    const handleRemoveAllergen = (index) => {
        const newAllergens = [...allergens];
        newAllergens.splice(index, 1);
        setAllergens(newAllergens);
    };

    return (
        <div>
            <SpeedDial
                ariaLabel="Allergen actions"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={() => setSpeedDialOpen(!speedDialOpen)}
                open={speedDialOpen}
                onOpen={() => setSpeedDialOpen(true)}
                onClose={() => setSpeedDialOpen(false)}
            >
                <SpeedDialAction
                    icon={<HealthAndSafetyIcon />}
                    tooltipTitle="Add allergens"
                    tooltipOpen
                    onClick={handleOpen}
                />
            </SpeedDial>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Allergens
                    </Typography>
                    <List>
                        {allergens.map((allergen, index) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAllergen(index)}>
                                    <DeleteIcon style={{ color: '#ffffff' }} />
                                </IconButton>
                            }>
                                <FormControlLabel
                                    control={<Checkbox checked={allergen.checked} onChange={() => handleCheckboxChange(index)} style={{ color: '#ffffff' }} />}
                                    label={allergen.name}
                                    style={{ color: '#ffffff' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        label="New Allergen"
                        value={newAllergen}
                        onChange={(e) => setNewAllergen(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        sx={textFieldStyle}
                    />
                    <Button variant="contained" onClick={handleAddAllergen} fullWidth style={{ marginTop: '1rem' }}>Add Allergen</Button>
                    {errorMessage && <Typography color="error" variant="body2" style={{ marginTop: '1rem' }}>{errorMessage}</Typography>}
                    {successMessage && <Typography color="success" variant="body2" style={{ marginTop: '1rem' }}>{successMessage}</Typography>}
                </Box>
            </Modal>
        </div>
    );
}

export default AllergenSelector;
