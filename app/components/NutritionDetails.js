import NutritionRow from "./NutritionRow";
import IngredientRow from "@/app/components/IngredientRow";
import {Alert} from "@mui/material";

export default function NutritionDetails({ data }) {
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
                    <hr/>
                </div>
                <div className="text-xl">
                    {/* Servings Info */}
                    <p>{data.Nutrients["ServingsPerContainer"].value} Servings per container</p>
                    <p className="font-bold">Serving Size: {data.Nutrients["ServingSize"].value} {data.Nutrients["ServingSize"].unit}</p>
                    <hr className="h-3 bg-white"/>
                </div>
                <div>
                    {/* Calories Info */}
                    <p className="text-xs font-bold">Amount Per serving</p>
                    <p className="text-3xl font-bold">Calories {data.Nutrients.Calories.value}</p>
                    <hr className="h-1 bg-white"/>
                </div>
                {/* Nutrients */}
                {/* Fat */}
                <div>
                    <NutritionRow nutrient={data.Nutrients["Total Fat"]} nutrientName="Total Fat" isNameBold={true}></NutritionRow>
                    <div className="pl-5">
                        <NutritionRow nutrient={data.Nutrients["Total Fat"]["Saturated Fat"]} nutrientName="Saturated Fat"></NutritionRow>
                        <NutritionRow nutrient={data.Nutrients["Total Fat"]["Trans Fat"]} nutrientName="Trans Fat" isNameItalic={true}></NutritionRow>
                        <NutritionRow nutrient={data.Nutrients["Total Fat"]["Polyunsaturated Fat"]} nutrientName="Polyunsaturated Fat"></NutritionRow>
                        <NutritionRow nutrient={data.Nutrients["Total Fat"]["Monounsaturated Fat"]} nutrientName="Monounsaturated Fat"></NutritionRow>
                    </div>
                </div>
                {/* Cholesterol */}
                <NutritionRow nutrient={data.Nutrients["Cholesterol"]} nutrientName="Cholesterol"></NutritionRow>
                {/* Sodium */}
                <NutritionRow nutrient={data.Nutrients["Sodium"]} nutrientName="Sodium" isNameBold={true}></NutritionRow>
                {/* Carbohydrate */}
                <div>
                    <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]} nutrientName="Total Carbohydrate" isNameBold={true}></NutritionRow>
                    <div className="pl-5">
                        <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]["Dietary Fiber"]} nutrientName="Dietary Fiber"></NutritionRow>
                        <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]["Total Sugars"]} nutrientName="Total Sugars"></NutritionRow>
                        <div className="pl-5">
                            <NutritionRow nutrient={data.Nutrients["Total Carbohydrate"]["Total Sugars"]["Added Sugars"]} nutrientName="Added Sugars"></NutritionRow>
                        </div>
                    </div>
                </div>
                {/* Protein */}
                <NutritionRow nutrient={data.Nutrients["Protein"]} nutrientName="Protein" isNameBold={true}></NutritionRow>
                <hr className="h-3 bg-white"/>

                {/* Vitamins */}
                <div>
                    {Object.entries(data.Nutrients["Vitamins"]).map(([key, {value, unit}]) => (
                        <p key={key}>{key} {value} {unit}</p>
                    ))}
                </div>
                <hr className="h-1 bg-white"/>
            </div>

            {/* Ingredients */}
            <div className="py-10">
                <h2 className="font-bold text-4xl text-center pb-3">Ingredients</h2>
                <h3 className="font-bold text-md text-center pb-3">Click an ingredient for more info</h3>
                {Object.entries(data.Ingredients).map(([name, {isHealthy, reason}]) => (
                    <IngredientRow key={name} ingredient={name} isHealthy={isHealthy} reason={reason}></IngredientRow>
                ))}
            </div>

            <Alert severity="info">AI-generated information may be inaccurate; always verify with reliable sources.</Alert>
        </div>
    );
};
