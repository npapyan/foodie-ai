"use client";
import { useState, useEffect } from 'react';
import Camera from "@/app/components/Camera/Camera";
import Title from "@/app/components/Common/Title";
import Selector from "@/app/components/Nutrition/Selector";
import NutritionDetails from "@/app/components/Nutrition/NutritionDetails";
import ProductNameInput from "@/app/components/Nutrition/ProductName";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

export default function Home() {
    const [allergens, setAllergens] = useState([
        { name: 'Milk', checked: false },
        { name: 'Almonds', checked: false },
    ]);
    const [nutritionData, setNutritionData] = useState(null);
    const [productCounter, setProductCounter] = useState(0);
    const [productName, setProductName] = useState(`Product Name ${productCounter}`);
    const [tempProductName, setTempProductName] = useState(productName);
    const [history, setHistory] = useState([]);

    // Handle history update only when a new scan is done
    const handleNutritionData = (data) => {
        setNutritionData(data);
        setProductCounter(prevCounter => {
            const newCounter = prevCounter + 1;
            const newProductName = `Product Name ${newCounter}`;
            setProductName(newProductName);
            setTempProductName(newProductName);

            // Check if the item already exists in history
            setHistory(prevHistory => {
                const exists = prevHistory.some(item => item.name === newProductName);
                if (exists) {
                    return prevHistory;
                }
                return [...prevHistory, { name: newProductName, data }];
            });

            return newCounter;
        });
    };

    const handleIngredientsData = (data) => {
        setNutritionData(prevState => ({
            ...prevState,
            Ingredients: data.Ingredients,
        }));
    };

    const onScanClick = () => {
        setNutritionData(null);
    };

    const handleSaveProductName = () => {
        setProductName(tempProductName);
        setHistory(prevHistory => {
            return prevHistory.map(item =>
                item.name === productName ? { ...item, name: tempProductName } : item
            );
        });
    };

    // Determine if the save icon should be displayed
    const showSaveIcon = productName !== tempProductName;

    // Handle history item click
    const handleHistoryItemClick = (item) => {
        setNutritionData(item.data);
        setProductName(item.name);
        setTempProductName(item.name);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Title />
            <Selector
                allergens={allergens}
                setAllergens={setAllergens}
                history={history}
                setHistory={setHistory}
                onHistoryItemClick={handleHistoryItemClick}
            />
            <Camera apiPath="/api/nutrition" onData={handleNutritionData} onClick={onScanClick} scanText="Scan Nutrition Facts" />
            {nutritionData && (
                <div>
                    <div className="flex items-center">
                        <ProductNameInput
                            productCounter={productCounter}
                            productName={tempProductName}
                            setProductName={setTempProductName}
                        />
                        {showSaveIcon && (
                            <IconButton onClick={handleSaveProductName} color="primary">
                                <SaveIcon />
                            </IconButton>
                        )}
                    </div>
                    <NutritionDetails data={nutritionData} allergens={allergens.filter(allergen => allergen.checked).map(allergen => allergen.name)} />
                    <div>
                        <h2 className="font-bold text-xl text-center pb-3">Missing/Incorrect Ingredients?</h2>
                        <h3 className="font-bold text-md text-center pb-3">Click below to rescan the ingredient section</h3>
                        <div className="flex justify-center">
                            <Camera apiPath="/api/ingredients" onData={handleIngredientsData} scanText="Scan Ingredients" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
