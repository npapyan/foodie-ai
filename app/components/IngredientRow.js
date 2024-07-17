import * as React from "react";
import BasicModal from "@/app/components/Modal";

export default function IngredientRow({ ingredient, isHealthy, reason }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!ingredient) {
        return null;
    }

    const openModal = () => {
        handleOpen();
    };

    // Determine background color based on isHealthy
    const bgColorClass = isHealthy ? 'bg-green-800' : 'bg-red-800';

    return (
        <div
            className={`border border-white rounded-lg p-2 mb-2 ${bgColorClass}`}
            onClick={openModal}
            style={{ cursor: 'pointer' }}
        >
            <p>{ingredient}</p>
            <BasicModal
                title={isHealthy ? 'Healthy' : 'Not Healthy'}
                body={reason}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
