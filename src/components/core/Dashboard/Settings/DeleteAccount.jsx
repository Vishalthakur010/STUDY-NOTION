import { FiTrash2 } from "react-icons/fi"
import {deleteProfile} from "../../../../services/operations/settingsAPI"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function DeleteAccount(){
    const {token} = useSelector( (state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleDeleteAccount = async() =>{
        try{
            dispatch(deleteProfile(token, navigate))
        }
        catch(error){
            console.error("error Deleting Account : ", error)
        }
    }

    return (
        <div className="flex flex-row gap-5 border-[1px] border-pink-700 rounded-md bg-pink-900 p-8 my-10">
            <div className="aspect-square w-14 h-14 flex items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-3xl text-pink-200"/>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-richblack-5 font-bold text-xl">
                    Delete Account
                </h2>

                <div className="text-pink-25 text-sm w-[80%] space-y-1 font-semibold">
                    <p>Would you like to delete account ?</p>
                    <p>This account contains paid courses. Deleting your account will remove all the content associated with it.</p>
                </div>

                <button
                type="button"
                onClick={handleDeleteAccount}
                className="text-pink-300 italic w-fit cursor-pointer"
                >
                    I want to delete my account
                </button>
            </div>
        </div>
    )
}