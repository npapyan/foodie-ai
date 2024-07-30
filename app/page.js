"use client";
import { useState } from 'react';
import Camera from "@/app/components/Camera/Camera";
import Title from "@/app/components/Common/Title";
import AllergenSelector from "@/app/components/Nutrition/AllergenSelector";

export default function Home() {
    const [allergens, setAllergens] = useState([
        { name: 'Milk', checked: false },
        { name: 'Almonds', checked: false },
    ]);

    // Filter allergens to only include names where checked is true
    const checkedAllergenNames = allergens
        .filter(allergen => allergen.checked)
        .map(allergen => allergen.name);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Title />
            <Camera allergens={checkedAllergenNames} />
            <AllergenSelector allergens={allergens} setAllergens={setAllergens} />
        </div>
    );
}
