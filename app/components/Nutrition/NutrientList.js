import React from 'react';
import NutritionRow from './Row/NutritionRow';

export default function NutrientList({ data, dailyCalorieLimit }) {
    // Utility function to render nutrients recursively with padding
    const renderNutrients = (name, nutrient, paddingLevel = 0, isBold = true) => {
        // If the nutrient has value and unit, render it first
        const renderMainNutrient = () => {
            if (nutrient.value !== undefined && nutrient.unit !== undefined) {
                return (
                    <div key={name} style={{ paddingLeft: `${paddingLevel * 1.5}rem` }}>
                        <NutritionRow
                            nutrient={nutrient}
                            nutrientName={name}
                            dailyCalorieLimit={dailyCalorieLimit}
                            isNameBold={isBold}
                        />
                    </div>
                );
            }
            return null;
        };

        // Render the subcategories if any
        const renderSubcategories = () => {
            return (
                <div>
                    {Object.entries(nutrient).map(([subKey, subValue]) => {
                        if (subKey !== 'value' && subKey !== 'unit') {
                            return renderNutrients(subKey, subValue, paddingLevel + 1, false);
                        }
                        return null;
                    })}
                </div>
            );
        };

        return (
            <div key={name}>
                {renderMainNutrient()}
                {renderSubcategories()}
            </div>
        );
    };

    return (
        <div>
            <div>
                {Object.entries(data.Nutrients).map(([key, value]) => {
                    // Skip the keys that are already listed elsewhere
                    if (key === 'ServingsPerContainer' || key === 'ServingSize' || key === 'Calories' || key === 'Vitamins') {
                        return null;
                    }

                    // Render main category with its value and subcategories
                    if (typeof value === 'object') {
                        return renderNutrients(key, value);
                    } else {
                        // Display nutrients that are not objects (should not occur based on provided data)
                        return (
                            <div key={key}>
                                <p className="font-bold">{key}:</p>
                                <p>{value}</p>
                            </div>
                        );
                    }
                })}
            </div>
            <hr className="h-3 bg-white"/>
            {/* Vitamins */}
            <div>
                {Object.entries(data.Nutrients["Vitamins"]).map(([key, {value, unit}]) => (
                    <NutritionRow key={key} nutrient={data.Nutrients["Vitamins"][key]} nutrientName={key}
                                  dailyCalorieLimit={dailyCalorieLimit} isVitamin={true}></NutritionRow>
                ))}
            </div>
        </div>
    );
};