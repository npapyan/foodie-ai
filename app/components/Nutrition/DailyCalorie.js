import React from 'react';
import { TextField, Box, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#b0b0b0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffffff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#b0b0b0',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#ffffff',
                    },
                },
            },
        },
    },
});

export default function DailyCalorie({ dailyCalorieLimit, setDailyCalorieLimit }) {
    const handleCalorieChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setDailyCalorieLimit(value);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box p={2} bgcolor="background.default" color="text.primary">
                <Typography variant="body2" gutterBottom>
                    The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <span>{dailyCalorieLimit} calories a day is used for general nutritional advice. </span>
                </Typography>
                <TextField
                    label="Daily Calorie Limit"
                    type="number"
                    value={dailyCalorieLimit}
                    onChange={handleCalorieChange}
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                />
            </Box>
        </ThemeProvider>
    );
}
