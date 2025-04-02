import { useEffect, useState } from "react"

export const RequirementField = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) => {

    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([])

    useEffect(()=> {
        register(name, {
            register:true, 
            validate:(value) => value.length >0
        })
    },[])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    const handleAddRequirement = () => {
        if (requirement && !requirementList.includes(requirement)) {
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedList = [...requirementList]
        updatedList.splice(index, 1)
        setRequirementList(updatedList)
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="label-style">
                {label} <sup className="text-pink-200">*</sup>
            </label>

            <input
                type="text"
                name={name}
                id={name}
                value={requirement}
                placeholder={placeholder}
                onChange={(e) => setRequirement(e.target.value)}
                className="form-style"
            />

            <button
                type="button"
                onClick={handleAddRequirement}
                className="text-yellow-50 font-bold grid place-items-start mt-1"
            >
                Add
            </button>
            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((Requirement, index) => (
                                <li key={index} className="flex items-center text-richblack-5 gap-2">
                                    <span>{Requirement}</span>
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveRequirement(index)}
                                    className="text-richblack-400 text-sm hover:text-pink-200"
                                    >
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }

            {/* error message */}
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} are required
                    </span>
                )
            }
        </div>
    )
}