"use client"
import { useState } from 'react';
import Camera from "@/app/components/Camera/Camera";
import Title from "@/app/components/Common/Title";
import AllergenSelector from "@/app/components/Nutrition/AllergenSelector";
import NutritionDetails from "@/app/components/Nutrition/NutritionDetails";

export default function Home() {
    const [allergens, setAllergens] = useState([
        { name: 'Milk', checked: false },
        { name: 'Almonds', checked: false },
    ]);
    const [nutritionData, setNutritionData] = useState(null);
    const [ingredientsData, setIngredientsData] = useState(null);

    const checkedAllergenNames = allergens
        .filter(allergen => allergen.checked)
        .map(allergen => allergen.name);

    const handleNutritionData = (data) => {
        console.log(data);
        setNutritionData(data);
    };

    const handleIngredientsData = (data) => {
        setIngredientsData(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Title />
            <AllergenSelector allergens={allergens} setAllergens={setAllergens} />
            <Camera apiPath="/api/nutrition" onData={handleNutritionData} scanText="Scan Nutrition Facts" />
            {nutritionData && (
                <NutritionDetails data={nutritionData} allergens={checkedAllergenNames} />
            )}
            {ingredientsData && !nutritionData && (
                <Camera apiPath="/api/ingredients" onData={handleIngredientsData} scanText="Scan Ingredients" />
            )}
            {ingredientsData && (
                <NutritionDetails data={ingredientsData} allergens={checkedAllergenNames} />
            )}
        </div>
    );
}
