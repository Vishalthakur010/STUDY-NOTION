
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
            className={`flex items-center gap-2 font-semibold cursor-pointer
                ${outline ? "bg-transparent border border-yellow-50" : "bg-yellow-50"}
             text-richblack-900 px-5 py-2 rounded-md ${customClasses}`}
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