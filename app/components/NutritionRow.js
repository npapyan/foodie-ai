import BasicModal from "@/app/components/Modal";
import * as React from "react";
import nutrientDailyValues from '../constants/nutrientDailyValues';

// Utility function to convert units if necessary
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
const calculateDailyIntake = (nutrient, amount, unit) => {
    const dailyValue = nutrientDailyValues[nutrient];
    if (!dailyValue) {
        return null;
    }

    const amountInMg = convertUnits(amount, unit, 'mg');
    const dailyValueInMg = convertUnits(dailyValue.value, dailyValue.unit, 'mg');

    const percentage = (amountInMg / dailyValueInMg) * 100;
    return percentage.toFixed(2); // return percentage with 2 decimal points
};

function lowercaseFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export default function NutritionRow({ nutrient, nutrientName, isNameItalic, isNameBold, dailyCalorieLimit }) {
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

    const percentage = calculateDailyIntake(lowercaseFirstLetter(nutrientName).replaceAll(' ', ''), nutrient.value, nutrient.unit);

    return (
        <div onClick={openModal} className="flex justify-between items-center">
            <div>
                <span className={`${isNameBold ? 'font-bold' : ''} ${isNameItalic ? 'italic' : ''}`}>
                    {nutrientName}
                </span> {nutrient.value} {nutrient.unit}
            </div>
            {percentage !== null && (
                <div className="ml-auto">
                    {percentage}%
                </div>
            )}
            <BasicModal
                title={nutrientName}
                body={`The value of ${nutrientName} is ${nutrient.value} ${nutrient.unit}. ${percentage !== null ? `This is ${percentage}% of the daily value.` : ''}`}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
