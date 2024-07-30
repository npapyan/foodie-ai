import IngredientRow from "@/app/components/Nutrition/IngredientRow";
import DailyCalorie from "@/app/components/Nutrition/DailyCalorie";
import { useMemo, useState } from "react";
import NutrientList from "@/app/components/Nutrition/NutrientList";
import NutrientListOld from "@/app/components/Nutrition/NutrientListOld";

export default function NutritionDetails({ data, allergens }) {
    const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2000);

    // Determine if the data is nutrition facts or ingredients
    const isNutritionData = data.Nutrients && data.Ingredients === undefined;

    const ingredientsWithAllergens = useMemo(() => {
        if (!isNutritionData || !data.Ingredients || !Array.isArray(allergens)) {
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
        <div className="p-10">
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

                        <DailyCalorie calorieLimit={dailyCalorieLimit} setDailyCalorieLimit={setDailyCalorieLimit} />
                    </div>
                </>
            )}

            {data.Ingredients && (
                <>
                    {/* Ingredients */}
                    <div>
                        <div className="text-center">
                            <h2 className="font-bold text-4xl">Ingredients</h2>
                            <hr />
                        </div>
                        <div className="text-xl">
                            {Object.entries(ingredientsWithAllergens).map(([name, details]) => (
                                <IngredientRow key={name} name={name} details={details} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
