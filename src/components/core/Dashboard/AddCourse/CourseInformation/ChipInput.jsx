import { useEffect } from "react";
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux";
import { useState } from "react";


export default function ChipInput({
    label,
    name,
    placeholder,
    register,
    setValue,
    getValues,
    errors
}) {
    const { editCourse, course } = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag);
        }
        register(name, { validate: (value) => value.length > 0 })
    }, [editCourse, register]);

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    // We want to let users type a tag and press Enter or , to add it.
    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault(); // Stop form submission
            const chipValue = event.target.value.trim();
            if (chipValue && !chips.includes(chipValue)) {
                setChips([...chips, chipValue]); // Add new tag
                event.target.value = ""; // Clear input
            }
        }
    };

    //   Users should be able to delete a tag by clicking a button.
    const handleDeleteChip = (chipindex) => {
        setChips(chips.filter((_, index) => index !== chipindex));
    }

    return (
        <div className="flex flex-col gap-2">
            {/* label */}
            <label htmlFor={name} className="label-style">
                {label} <sup className="text-pink-200">*</sup>
            </label>

            {/* chips & Input */}
            <div className="flex flex-wrap gap-2 w-full gap-y-2">
                {/* Display existing chips */}
                {chips.map((chip, index) => (
                    <div key={index} className="m-1 flex  items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                        {chip}
                        <button type="button"
                            className="ml-1 focus:outline-none"
                            onClick={() => handleDeleteChip(index)}>
                            {/* Close icon */}
                            <MdClose className="text-sm" />
                        </button>
                    </div>
                ))}

                {/* Input field for adding new chips*/}
                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="w-full form-style"
                />

                {/* Error message */}
                {errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )}
            </div>

        </div>
    )
}