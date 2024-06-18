export default function NutritionDetails({ data }) {
    if (!data || !data.nutritionFacts || !data.ingredients || !data.overallAnalysis) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Nutrition Facts */}
            <div>
                <h2>Nutrition Facts</h2>
                {Object.entries(data.nutritionFacts).map(([key, { value, unit }]) => (
                    <p key={key}>{key}: {value} {unit}</p>
                ))}
            </div>

            {/* Ingredients List */}
            <div>
                <h2>Ingredients</h2>
                {Object.entries(data.ingredients).map(([name, { isHealthy, reason }]) => (
                    <div key={name}>
                        <p>{name} - {isHealthy ? 'Healthy' : 'Not Healthy'}</p>
                        <p>Reason: {reason}</p>
                    </div>
                ))}
            </div>

            {/* Overall Analysis */}
            <div>
                <h2>Overall Analysis</h2>
                <p>Is it healthy? {data.overallAnalysis.isHealthy ? 'Yes' : 'No'}</p>
                <p>Reason: {data.overallAnalysis.reason}</p>
            </div>
        </div>
    );
};
