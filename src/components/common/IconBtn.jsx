
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
        // className={`
        //     ${outline ? "outline" : ""}
        //     ${customClasses}
        // `}
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