
export const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className="text-lg font-bold bg-yellow-50 text-richblack-900 px-6 py-2 rounded-md"
        >
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (
                    <span>
                        {text}
                    </span>
                )
            }
        </button>
    )
}