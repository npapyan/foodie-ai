import NutritionRow from "./NutritionRow";
import IngredientRow from "@/app/components/Nutrition/IngredientRow";
import DailyCalorie from "@/app/components/Nutrition/DailyCalorie";
import { Alert } from "@mui/material";
import { useMemo, useState } from "react";
import Button from "@/app/components/Common/Button";

export default function NutritionDetails({ data, allergens }) {
    const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2000);
    const [ingredientsWithAllergens, setIngredientsWithAllergens] = useState(() => {
        if (!data || !data.Ingredients || !Array.isArray(allergens)) {
            return {};
        }
        return Object.entries(data.Ingredients).reduce((acc, [name, details]) => {
            const isAllergen = allergens.some(
                allergen => typeof allergen === 'string' && name.toLowerCase().includes(allergen.toLowerCase())
            );
            acc[name] = { ...details, isAllergen };
            return acc;
        }, {});
    });

    const handleScanIngredients = async (image) => {
        try {
            const response = await fetch('/api/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image }),
            });
            const result = await response.json();
            if (response.ok) {
                setIngredientsWithAllergens(result.ingredients);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error scanning ingredients:", error);
        }
    };

    const handleRescanIngredients = async () => {
        const image = data.image; // Assuming the image is part of the data prop
        handleScanIngredients(image);
    };

    if (!data || !data.Nutrients || !data.Ingredients) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-10">
            {/* Nutrition Facts */}
            <div className="">
                {/* Nutrition Facts Label */}
                <div className="text-center">
                    <h2 className="font-bold text-4xl">Nutrition Facts</h2>
                    <hr />
                </div>
                <div className="text-xl">
                    {/* Servings Info */}
                    <p>{data.Nutrients["ServingsPerContainer"].value} Servings per container</p>
                    <p className="font-bold">Serving Size: {data.Nutrients["ServingSize"].value} {data.Nutrients["ServingSize"].unit}</p>
                    <hr className="h-3 bg-white" />
                </div>
                <div>
                    {/* Calories Info */}
                    <p className="text-xs font-bold">Amount Per serving</p>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-3xl font-bold">Calories {data.Nutrients.Calories.value}</p>
                        </div>
                        <p className="font-bold">% Daily Value</p>
                    </div>
                    <hr className="h-1 bg-white" />
                </div>
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
                <hr className="h-3 bg-white" />

                {/* Vitamins */}
                <div>
                    {Object.entries(data.Nutrients["Vitamins"]).map(([key, { value, unit }]) => (
                        <NutritionRow key={key} nutrient={data.Nutrients["Vitamins"][key]} nutrientName={key}
                                      dailyCalorieLimit={dailyCalorieLimit}></NutritionRow>
                    ))}
                </div>
                <hr className="h-1 bg-white" />
                <br />
                <DailyCalorie dailyCalorieLimit={dailyCalorieLimit}
                              setDailyCalorieLimit={setDailyCalorieLimit}></DailyCalorie>
            </div>

            {/* Ingredients */}
            {Object.keys(ingredientsWithAllergens).length > 0 ? (
                <div className="py-10">
                    <h2 className="font-bold text-4xl text-center pb-3">Ingredients</h2>
                    <h3 className="font-bold text-md text-center pb-3">Click an ingredient for more info</h3>
                    <Alert severity="warning">Ingredients may sometimes be hallucinated.</Alert>
                    {Object.entries(ingredientsWithAllergens).map(([name, { isHealthy, reason, isAllergen }]) => (
                        <IngredientRow key={name} ingredient={name} isHealthy={isHealthy} reason={reason}
                                       isAllergen={isAllergen} />
                    ))}
                    <div className="py-10">
                        <h2 className="font-bold text-xl text-center pb-3">Missing Ingredients?</h2>
                        <h3 className="font-bold text-md text-center pb-3">Click below to rescan the ingredient section</h3>
                        <div className="flex justify-center">
                            <Button buttonText="Rescan Ingredients" onClick={handleRescanIngredients} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-10">
                    <h2 className="font-bold text-4xl text-center pb-3">No Ingredients Found</h2>
                    <h3 className="font-bold text-md text-center pb-3">Would you like to scan ingredients separately?</h3>
                    <div className="flex justify-center">
                        <Button buttonText="Scan Ingredients" onClick={handleRescanIngredients} />
                    </div>
                </div>
            )}

            <Alert severity="info">AI-generated information may be inaccurate; always verify with reliable sources.</Alert>
        </div>
    );
};
