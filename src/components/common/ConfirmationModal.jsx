import { IconBtn } from "./IconBtn"

export const ConfirmationModal = ({modalData}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur bg-richblack-800 bg-opacity-55 flex items-center justify-center z-10">

        
        <div className="bg-richblack-800 rounded-lg border-[2px] border-richblack-600  flex flex-col gap-4 p-8 ">
            <p className="text-3xl text-richblack-5 font-semibold">{modalData.text1}</p>
            <p className="text-richblack-300 text-lg font-semibold">{modalData.text2}</p>

            <div className="flex items-center gap-5">
                <IconBtn
                    onclick={modalData?.btn1handler}
                    text={modalData?.btn1text}
                />

                <button onClick={modalData?.btn2handler}
                    className="text-lg font-bold bg-richblack-300 text-richblack-900 px-6 py-2 rounded-md">         
                    {modalData?.btn2text}
                </button>
            </div>
        </div>
        </div>
    )
}