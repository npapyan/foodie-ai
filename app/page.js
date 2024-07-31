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

    const checkedAllergenNames = allergens
        .filter(allergen => allergen.checked)
        .map(allergen => allergen.name);

    const handleNutritionData = (data) => {
        setNutritionData(data);
    };

    const handleIngredientsData = (data) => {
        setNutritionData(prevState => ({
            ...prevState,
            Ingredients: data.Ingredients,
        }));
    };

    const onScanClick = () => {
        setNutritionData(null);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Title/>
            <AllergenSelector allergens={allergens} setAllergens={setAllergens}/>
            <Camera apiPath="/api/nutrition" onData={handleNutritionData} onClick={onScanClick}  scanText="Scan Nutrition Facts"/>
            {nutritionData && (
                <div>
                    <NutritionDetails data={nutritionData} allergens={checkedAllergenNames}/>
                    <div>
                        <h2 className="font-bold text-xl text-center pb-3">Missing/Incorrect Ingredients?</h2>
                        <h3 className="font-bold text-md text-center pb-3">Click below to rescan the ingredient section</h3>
                        <div className="flex justify-center">
                            <Camera apiPath="/api/ingredients" onData={handleIngredientsData} scanText="Scan Ingredients"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
