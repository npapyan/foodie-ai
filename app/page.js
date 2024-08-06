"use client";
import { useState, useEffect } from 'react';
import Camera from "@/app/components/Camera/Camera";
import Title from "@/app/components/Common/Title";
import Selector from "@/app/components/Nutrition/Selector";
import NutritionDetails from "@/app/components/Nutrition/NutritionDetails";
import ProductNameInput from "@/app/components/Nutrition/ProductName";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

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
    const [showAlert, setShowAlert] = useState(false);

    // Handle history update only when a new scan is done
    const handleNutritionData = (data) => {
        if (!data.Nutrients) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 6000);
        }
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
            {showAlert && (
                <Alert variant="filled" severity="error" className="mb-4">
                    An error occurred while scanning. Please try again.
                </Alert>
            )}
            <Title />
            <Selector
                allergens={allergens}
                setAllergens={setAllergens}
                history={history}
                setHistory={setHistory}
                onHistoryItemClick={handleHistoryItemClick}
            />
            <Camera apiPath="/api/nutrition" onData={handleNutritionData} onClick={onScanClick} scanText="Scan Nutrition Facts" />
            {nutritionData && nutritionData.Nutrients && (
                <div>
                    <div id="overallHealthyAnalysis" className="flex flex-col items-center justify-center mb-4 p-5">
                        <Alert variant="outlined" severity={nutritionData?.overallAnalysis?.isHealthy ? 'success' : 'error'} className="mb-4">
                            <div className={`${nutritionData?.overallAnalysis?.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                                <h1 className="text-3xl font-bold">
                                    {nutritionData?.overallAnalysis?.isHealthy ? "Overall Healthy" : "Overall Unhealthy"}
                                </h1>
                                <p>
                                    {nutritionData?.overallAnalysis?.reason}
                                </p>
                            </div>
                        </Alert>
                    </div>
                    <div className="flex items-center">
                        <ProductNameInput
                            productCounter={productCounter}
                            productName={tempProductName}
                            setProductName={setTempProductName}
                        />
                        {showSaveIcon && (
                            <IconButton onClick={handleSaveProductName} color="primary">
                                <SaveIcon/>
                            </IconButton>
                        )}
                    </div>
                    <NutritionDetails data={nutritionData} allergens={allergens.filter(allergen => allergen.checked).map(allergen => allergen.name)} />
                    <div>
                        <h2 className="font-bold text-xl text-center pb-3">Missing/Incorrect Ingredients?</h2>
                        <h3 className="font-bold text-md text-center pb-3">Click below to rescan the ingredient section</h3>
                        <div className="flex justify-center">
                            <Camera apiPath="/api/ingredients" onData={handleIngredientsData}
                                    scanText="Scan Ingredients"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
