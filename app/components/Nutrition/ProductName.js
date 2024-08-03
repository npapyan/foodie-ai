// ProductNameInput.js
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import DarkTheme from "@/app/components/Theme/DarkTheme";

export default function ProductNameInput({productCounter, productName, setProductName}) {

    useEffect(() => {
        productCounter++;
    }, []);

    const handleChange = (event) => {
        setProductName(event.target.value);
    };

    return (
        <ThemeProvider theme={DarkTheme}>
            <TextField
                className="p-5"
                variant="outlined"
                value={productName}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
        </ThemeProvider>
    );
}
