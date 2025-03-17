import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../../common/IconBtn";
import { useEffect, useRef, useState } from "react";
import {updateDisplayPicture} from "../../../../services/operations/settingsAPI"

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [imageFile, setImageFile] = useState(null)
    const [previewFile, setPreviewFile] = useState(null)

    const [loading, setLoading] = useState(false)
    const imageRef = useRef(null)


    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if(file){
            setImageFile(file)
            setPreviewFile(URL.createObjectURL(file))
        }
    }

    const handleFileUpload = async () => {
        try{
            // console.log("Uploading...")
            setLoading(true)

            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            // console.log("formData : ", formData)

            dispatch( updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        }
        catch(error){
            console.log("error changing profile picture : ", error.message)
        }
    }

    useEffect( ()=>{
        if(imageFile) {
            setPreviewFile(URL.createObjectURL(imageFile))
        }
    },[imageFile])

    return (
        <div className="flex items-center gap-4  bg-richblack-800 p-6 rounded-lg">
            <img
                src={previewFile || user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[70px] object-cover rounded-full"
            />

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">
                    Change Profile Picture
                </p>
                <div className="flex items-center gap-2">

                    <input
                        type="file"
                        ref={imageRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => imageRef.current.click()}
                        disabled={loading}
                        className="flex items-center text-lg font-bold bg-richblack-700 px-4 py-1 rounded-md"
                    >
                        Select
                    </button>

                    <IconBtn
                        text={loading ? "Uploading..." : "Upload"}
                        onclick={handleFileUpload}
                    >
                        {
                            !loading && (
                                <FiUpload className="text-lg text-richblack-900" />
                            )
                        }
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture