
export const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses="",
    type
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`flex items-center gap-2 text-lg font-bold 
                bg-yellow-50 text-richblack-900 px-4 py-1 rounded-md ${customClasses}`}
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