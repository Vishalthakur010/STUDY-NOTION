import { IconBtn } from "./IconBtn"

export const ConfirmationModal = ({modalData}) => {
    return (
        <div>
            <p>{modalData.text1}</p>
            <p>{modalData.text2}</p>

            <div>
                <IconBtn
                    onclick={modalData?.btn1handler}
                    text={modalData?.btn1text}
                />

                <button onClick={modalData?.btn2handler}>         
                    {modalData?.btn2text}
                </button>
            </div>
        </div>
    )
}