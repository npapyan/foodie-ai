const nutrientDailyValues = {
    addedSugars: {
        name: "Added sugars",
        value: 50,
        unit: "g",
        tooLow: null,
        tooHigh: 50,
        notes: "High intake linked to various health issues."
    },
    totalSugars: {
        name: "Total sugars",
        value: null,
        unit: "g",
        tooLow: null,
        tooHigh: null,
        notes: "Includes both naturally occurring and added sugars."
    },
    biotin: {
        name: "Biotin",
        value: 30,
        unit: "mcg",
        notes: "Important for skin health, nerve function, and metabolism."
    },
    calcium: {
        name: "Calcium",
        value: 1300,
        unit: "mg",
        tooLow: 1000,
        tooHigh: 2500,
        notes: "Crucial for bone health and muscle function."
    },
    chloride: {
        name: "Chloride",
        value: 2300,
        unit: "mg",
        notes: "Important for fluid balance and digestion."
    },
    choline: {
        name: "Choline",
        value: 550,
        unit: "mg",
        notes: "Supports liver function, normal brain development, and nerve function."
    },
    cholesterol: {
        name: "Cholesterol",
        value: 300,
        unit: "mg",
        tooLow: null,
        tooHigh: 300,
        notes: "High levels can increase heart disease risk."
    },
    chromium: {
        name: "Chromium",
        value: 35,
        unit: "mcg",
        notes: "Helps maintain blood sugar levels."
    },
    copper: {
        name: "Copper",
        value: 0.9,
        unit: "mg",
        notes: "Important for iron metabolism and maintaining healthy bones, blood vessels, nerves, and immune function."
    },
    dietaryFiber: {
        name: "Dietary Fiber",
        value: 28,
        unit: "g",
        tooLow: 25, // Less for women, more for men
        tooHigh: null,
        notes: "Essential for digestive health."
    },
    totalFat: {
        name: "Fat",
        value: 78,
        unit: "g",
        tooLow: "20%", // Of daily calories
        tooHigh: "35%", // Of daily calories
        notes: "Aim for a balance of fats to maintain health."
    },
    folate: {
        name: "Folate/Folic Acid",
        value: 400,
        unit: "mcg DFE",
        tooLow: 400,
        tooHigh: 1000,
        notes: "Important for DNA synthesis and during pregnancy."
    },
    iodine: {
        name: "Iodine",
        value: 150,
        unit: "mcg",
        notes: "Crucial for thyroid function and metabolism."
    },
    iron: {
        name: "Iron",
        value: 18,
        unit: "mg",
        tooLow: 8, // Different for men
        tooHigh: 45,
        notes: "Essential for oxygen transport in blood."
    },
    magnesium: {
        name: "Magnesium",
        value: 420,
        unit: "mg",
        tooLow: 320, // Different for women
        tooHigh: 350, // From supplements
        notes: "Key for many enzymatic reactions."
    },
    manganese: {
        name: "Manganese",
        value: 2.3,
        unit: "mg",
        notes: "Supports bone health and plays a role in blood sugar regulation."
    },
    molybdenum: {
        name: "Molybdenum",
        value: 45,
        unit: "mcg",
        notes: "Involved in enzyme function."
    },
    niacin: {
        name: "Niacin",
        value: 16,
        unit: "mg NE",
        notes: "Helps convert food into energy and maintains healthy skin, nerves, and digestive system."
    },
    pantothenicAcid: {
        name: "Pantothenic Acid",
        value: 5,
        unit: "mg",
        notes: "Important for the metabolism of food, as well as hormone and cholesterol production."
    },
    phosphorus: {
        name: "Phosphorus",
        value: 1250,
        unit: "mg",
        tooLow: null,
        tooHigh: 4000,
        notes: "Important for bone health and energy storage."
    },
    potassium: {
        name: "Potassium",
        value: 4700,
        unit: "mg",
        tooLow: 3500,
        tooHigh: 4700,
        notes: "Essential for cell function and reducing blood pressure."
    },
    protein: {
        name: "Protein",
        value: 50,
        unit: "g",
        tooLow: "10%", // Of daily calories
        tooHigh: "35%", // Of daily calories
        notes: "Essential for muscle and cellular structures."
    },
    riboflavin: {
        name: "Riboflavin",
        value: 1.3,
        unit: "mg",
        notes: "Supports cellular function and helps convert food into energy."
    },
    saturatedFat: {
        name: "Saturated fat",
        value: 20,
        unit: "g",
        tooLow: null,
        tooHigh: "10%", // Of daily calories
        notes: "Linked to increased heart disease risk."
    },
    selenium: {
        name: "Selenium",
        value: 55,
        unit: "mcg",
        notes: "Plays a critical role in reproduction, thyroid hormone metabolism, DNA synthesis, and protection from oxidative damage and infection."
    },
    sodium: {
        name: "Sodium",
        value: 2300,
        unit: "mg",
        tooLow: 1500,
        tooHigh: 2300,
        notes: "Key for fluid balance but high levels raise blood pressure."
    },
    thiamin: {
        name: "Thiamin",
        value: 1.2,
        unit: "mg",
        notes: "Important for nervous system and muscle functioning, as well as carbohydrate metabolism."
    },
    totalCarbohydrate: {
        name: "Total carbohydrate",
        value: 275,
        unit: "g",
        tooLow: 130,
        tooHigh: null,
        notes: "Main source of energy."
    },
    transFat: {
        name: "Trans fat",
        value: null,
        unit: "g",
        tooLow: null,
        tooHigh: null,
        notes: "Should be minimized to reduce the risk of heart disease."
    },
    vitaminA: {
        name: "Vitamin A",
        value: 900,
        unit: "mcg RAE",
        tooLow: 700, // Different for women
        tooHigh: 3000,
        notes: "Important for vision and immune function."
    },
    vitaminB6: {
        name: "Vitamin B6",
        value: 1.7,
        unit: "mg",
        tooLow: 1.3,
        tooHigh: 100,
        notes: "Important for metabolism and brain health."
    },
    vitaminB12: {
        name: "Vitamin B12",
        value: 2.4,
        unit: "mcg",
        tooLow: 2.4,
        tooHigh: null, // No known toxicity
        notes: "Crucial for nerve function and red blood cell production."
    },
    vitaminC: {
        name: "Vitamin C",
        value: 90,
        unit: "mg",
        tooLow: 75, // Different for women
        tooHigh: 2000,
        notes: "Antioxidant important for skin and immune health."
    },
    vitaminD: {
        name: "Vitamin D",
        value: 20,
        unit: "mcg",
        tooLow: 15,
        tooHigh: 100,
        notes: "Crucial for bone health and calcium absorption."
    },
    vitaminE: {
        name: "Vitamin E",
        value: 15,
        unit: "mg alpha-tocopherol",
        tooLow: 15,
        tooHigh: 1000,
        notes: "Protects cells from oxidative damage."
    },
    vitaminK: {
        name: "Vitamin K",
        value: 120,
        unit: "mcg",
        tooLow: null,
        tooHigh: null, // Generally considered safe
        notes: "Essential for blood clotting and bone health."
    },
    zinc: {
        name: "Zinc",
        value: 11,
        unit: "mg",
        tooLow: 8, // Different for women
        tooHigh: 40,
        notes: "Important for immune function and wound healing."
    }
};

export default nutrientDailyValues;
