import BasicModal from "@/app/components/Modal";
import * as React from "react";

export default function NutritionRow({ nutrient, nutrientName, isNameItalic, isNameBold }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const openModal = () => {
        handleOpen();
    };

    if (!nutrient || nutrient.value == null) {
        return null;
    }

    return (
        <div onClick={openModal}>
            <p>
                <span className={`${isNameBold ? 'font-bold' : ''} ${isNameItalic ? 'italic' : ''}`}>
                    {nutrientName}
                </span> {nutrient.value} {nutrient.unit}
                <BasicModal
                    title={nutrientName}
                    body={`The value of ${nutrientName} is ${nutrient.value} ${nutrient.unit}.`}
                    open={open}
                    onClose={handleClose}
                />
            </p>
        </div>
    )
};
