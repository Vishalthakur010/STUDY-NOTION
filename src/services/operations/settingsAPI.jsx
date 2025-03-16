import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import { settingsEndpoints } from "../api";
import {logout} from "./authAPI"

const {
    UPDATE_DISPLAY_PICTURE,
    UPDATE_PROFILE,
    CHANGE_PASSWORD,
    DELETE_ACCOUNT
} = settingsEndpoints


export const updateDisplayPicture = (token, formData) => async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("PUT",
            UPDATE_DISPLAY_PICTURE,
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        )

        console.log("UPDATE_DISPLAY_PICTURE API response ... ", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(setUser(response.data.data))
        toast.success("Display picture updated successfully")
    }
    catch (error) {
        console.log("error in updateDisplayPicture API: ", error)
        toast.error("Failed to update display picture")
    }
    toast.dismiss(toastId)
}


export const updateProfile = (token, data) => async (dispatch) => {

    const toastId = toast.loading("Loading...")
    try {
        const response = await apiconnector("PUT",
            UPDATE_PROFILE,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("UPDATE_PROFILE API response ... ", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        const userImage = response.data.updatedUserDetails.image ?
        response.data.updatedUserDetails.image 
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

        dispatch(
            setUser({...response.data.updatedUserDetails, image:userImage})
        )

        toast.success("Profile updated successfully")
    }
    catch (error) {
        console.log("error in UPDATE_PROFILE API: ", error)
        toast.error("Failed to update profile")
    }
    toast.dismiss(toastId)
}

export async function changePassword (token, data){
    const toastId= toast.loading("Loading...")

    try{
        const response = await apiconnector("POST",
            CHANGE_PASSWORD,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("CHANGE_PASSWORD API response : ", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }


        toast.success("Password Updated successfully")
    }
    catch(error){
        console.log("error in UPDATE_PASSWORD API : ", error)
        toast.error("Couldn't update password")
    }
    toast.dismiss(toastId)
}

export function deleteProfile (token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiconnector("DELETE",
                DELETE_ACCOUNT,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Account Deleted Successfully")
            dispatch(logout(navigate))
        }
        catch(error){
            console.log("error in DELETE_ACCOUNT API : ", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}