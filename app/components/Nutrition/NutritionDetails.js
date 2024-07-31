import IngredientRow from "@/app/components/Nutrition/IngredientRow";
import DailyCalorie from "@/app/components/Nutrition/DailyCalorie";
import {useMemo, useState} from "react";
import NutrientList from "@/app/components/Nutrition/NutrientList";
import {Alert} from "@mui/material";

export default function NutritionDetails({ data, allergens }) {
    const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2000);
    const isNutritionData = data.Nutrients && data.Ingredients === undefined;

    const ingredientsWithAllergens = useMemo(() => {
        if (!data.Ingredients) {
            return {};
        }
        return Object.entries(data.Ingredients).reduce((acc, [name, details]) => {
            const isAllergen = allergens.some(
                allergen => typeof allergen === 'string' && name.toLowerCase().includes(allergen.toLowerCase())
            );
            acc[name] = { ...details, isAllergen };
            return acc;
        }, {});
    }, [data, allergens, isNutritionData]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            {data.Nutrients && (
                <>
                    {/* Nutrition Facts */}
                    <div className="">
                        <div className="text-center">
                            <h2 className="font-bold text-4xl">Nutrition Facts</h2>
                            <hr />
                        </div>
                        <div className="text-xl">
                            <p>{data.Nutrients["ServingsPerContainer"].value} Servings per container</p>
                            <p className="font-bold">Serving Size: {data.Nutrients["ServingSize"].value} {data.Nutrients["ServingSize"].unit}</p>
                            <hr className="h-3 bg-white" />
                        </div>
                        <div>
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
                        <div className="pt-2">
                            <NutrientList data={data} dailyCalorieLimit={dailyCalorieLimit} />
                        </div>

                        <DailyCalorie dailyCalorieLimit={dailyCalorieLimit} setDailyCalorieLimit={setDailyCalorieLimit} />
                        <br />
                    </div>
                </>
            )}


            {/* Ingredients */}
            {Object.keys(ingredientsWithAllergens).length > 0 && (
                <div className="py-10">
                    <h2 className="font-bold text-4xl text-center pb-3">Ingredients</h2>
                    <h3 className="font-bold text-md text-center pb-3">Click an ingredient for more info</h3>
                    <Alert severity="warning">Ingredients may sometimes be hallucinated.</Alert>
                    <br />
                    {Object.entries(ingredientsWithAllergens).map(([name, { isHealthy, reason, isAllergen }]) => (
                        <IngredientRow key={name} ingredient={name} isHealthy={isHealthy} reason={reason}
                                       isAllergen={isAllergen} />
                    ))}
                </div>
            )}
        </div>
    );
}
