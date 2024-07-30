import React from 'react';
import NutritionRow from './NutritionRow';

const NutrientList = ({ data, dailyCalorieLimit }) => {
    return (
        <div>
            {/* Nutrients */}
            {/* Fat */}
            <div>
                <NutritionRow nutrient={data.Nutrients["Total Fat"]} nutrientName="Total Fat" isNameBold={true}
                              dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                <div className="pl-5">
                    <NutritionRow nutrient={data.Nutrients["Total Fat"]["Saturated Fat"]}
                                  nutrientName="Saturated Fat" dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    <NutritionRow nutrient={data.Nutrients["Total Fat"]["Trans Fat"]} nutrientName="Trans Fat"
                                  isNameItalic={true} dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    <NutritionRow nutrient={data.Nutrients["Total Fat"]["Polyunsaturated Fat"]}
                                  nutrientName="Polyunsaturated Fat"
                                  dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    <NutritionRow nutrient={data.Nutrients["Total Fat"]["Monounsaturated Fat"]}
                                  nutrientName="Monounsaturated Fat"
                                  dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                </div>
            </div>
            {/* Cholesterol */}
            <NutritionRow nutrient={data.Nutrients["Cholesterol"]} nutrientName="Cholesterol"
                          dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
            {/* Sodium */}
            <NutritionRow nutrient={data.Nutrients["Sodium"]} nutrientName="Sodium" isNameBold={true}
                          dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
            {/* Carbohydrate */}
            <div>
                <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]} nutrientName="Total Carbohydrate"
                              isNameBold={true} dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                <div className="pl-5">
                    <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]["Dietary Fiber"]}
                                  nutrientName="Dietary Fiber" dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]["Total Sugars"]}
                                  nutrientName="Total Sugars" dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    <div className="pl-5">
                        <NutritionRow
                            nutrient={data.Nutrients["Total Carbohydrate"]["Total Sugars"]["Added Sugars"]}
                            nutrientName="Added Sugars" dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    </div>
                </div>
            </div>
            {/* Protein */}
            <NutritionRow nutrient={data.Nutrients["Protein"]} nutrientName="Protein" isNameBold={true}
                          dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
            <hr className="h-3 bg-white"/>

            {/* Vitamins */}
            <div>
                {Object.entries(data.Nutrients["Vitamins"]).map(([key, {value, unit}]) => (
                    <NutritionRow key={key} nutrient={data.Nutrients["Vitamins"][key]} nutrientName={key}
                                  dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                ))}
            </div>
        </div>
    )
};

export default NutrientList;
