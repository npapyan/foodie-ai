import BasicModal from "@/app/components/Common/Modal";
import * as React from "react";
import nutrientDailyValues from '../../../constants/nutrientDailyValues';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRounded from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Tooltip, Alert } from '@mui/material';

const convertUnits = (value, fromUnit, toUnit) => {
    const conversions = {
        mcg: 0.001, // 1 mcg = 0.001 mg
        mg: 1,      // 1 mg = 1 mg
        g: 1000     // 1 g = 1000 mg
    };

    if (fromUnit === toUnit) {
        return value;
    }

    return value * conversions[fromUnit] / conversions[toUnit];
};

// Calculate the percentage of daily intake for a given nutrient
const calculateDailyIntake = (nutrient, amount, unit, dailyCalorieLimit, defaultCalorieLimit) => {
    const dailyValue = nutrientDailyValues[nutrient];
    if (!dailyValue || dailyValue.value === null || dailyValue.value === undefined) {
        return null;
    }

    const amountInMg = convertUnits(amount, unit, 'mg');
    const dailyValueInMg = convertUnits(dailyValue.value, dailyValue.unit, 'mg');

    if (dailyValueInMg === 0) {
        return null;
    }

    const percentage = (amountInMg / dailyValueInMg) * 100;
    const adjustedPercentage = (percentage * defaultCalorieLimit) / dailyCalorieLimit;

    return adjustedPercentage.toFixed(2);
};

function lowercaseFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export default function NutritionRow({ nutrient, nutrientName, isNameItalic, isNameBold, dailyCalorieLimit, isVitamin }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const defaultCalorieLimit = 2000;

    const openModal = () => {
        handleOpen();
    };

    if (!nutrient || nutrient.value == null) {
        return null;
    }

    const nutrientNameLookup = lowercaseFirstLetter(nutrientName).replaceAll(' ', '');
    const percentage = calculateDailyIntake(
        nutrientNameLookup,
        nutrient.value,
        nutrient.unit,
        dailyCalorieLimit,
        defaultCalorieLimit
    );

    const nutrientInfo = nutrientDailyValues[nutrientNameLookup];
    const highDailyValueExclusions = ["Protein", "Calcium", "Dietary Fiber"];
    const lowDailyValueExclusions = ["Added Sugars", "Sodium", "Cholesterol", "Total Fat", "Saturated Fat", "Total Carbohydrate"];
    const isDailyValueTooHigh = !isVitamin && percentage !== null && percentage > 20 && !highDailyValueExclusions.includes(nutrientName);
    const isDailyValueTooLow = !isVitamin && percentage !== null && percentage < 5 && !lowDailyValueExclusions.includes(nutrientName);

    return (
        <div onClick={openModal} className="flex justify-between items-center">
            <div>
                <span className={`${isNameBold ? 'font-bold' : ''} ${isNameItalic ? 'italic' : ''}`}>
                    {nutrientName}
                </span> {nutrient.value} {nutrient.unit}
            </div>
            {percentage !== null && !isNaN(percentage) && (
                <div className="flex items-center ml-auto">
                    {isDailyValueTooHigh && (
                        <Tooltip title="High percentage of daily value" arrow>
                            <KeyboardDoubleArrowUpRounded style={{ color: 'red' }} />
                        </Tooltip>
                    )}
                    {isDailyValueTooLow && (
                        <Tooltip title="Low percentage of daily value" arrow>
                            <KeyboardDoubleArrowDownIcon style={{ color: 'red' }} />
                        </Tooltip>
                    )}
                    {percentage}%
                </div>
            )}
            <BasicModal
                title={nutrientName}
                body={
                    <>
                        <p>{nutrientInfo?.notes}</p>
                        <br />
                        {isDailyValueTooHigh && (
                            <Alert severity="warning">This nutrient has a high percentage of daily value.</Alert>
                        )}
                        {isDailyValueTooLow && (
                            <Alert severity="warning">This nutrient has a low percentage of daily value.</Alert>
                        )}
                    </>
                }
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}