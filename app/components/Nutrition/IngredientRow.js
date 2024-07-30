import * as React from "react";
import BasicModal from "@/app/components/Common/Modal";
import { Tooltip } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function IngredientRow({ ingredient, isHealthy, reason, isAllergen }) {
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
    let bgColorClass = isHealthy ? 'bg-green-800' : 'bg-red-800';
    if (isAllergen) {
        bgColorClass = 'bg-red-800';
    }

    const modalBody = (
        <>
            {reason}
            {isAllergen && (
                <>
                    <br />
                    <br />
                    Note: This ingredient is a selected allergen
                </>
            )}
        </>
    );

    const modalText = (isHealthy ? 'Healthy' + (isAllergen ? ' but is an Allergen' : '') : 'Not Healthy');

    return (
        <div
            className={`border border-white rounded-lg p-2 mb-2 ${bgColorClass} flex items-center`}
            onClick={openModal}
            style={{ cursor: 'pointer' }}
        >
            <p className="flex-grow">{ingredient}</p>
            {isAllergen && (
                <Tooltip title={`${ingredient} is an allergen`}>
                    <div className="flex items-center ml-2">
                        <ErrorOutlineIcon style={{ color: 'white' }} />
                    </div>
                </Tooltip>
            )}
            <BasicModal
                title={modalText}
                body={modalBody}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
