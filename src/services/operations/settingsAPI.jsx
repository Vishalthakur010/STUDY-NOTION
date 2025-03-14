import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import { setLoading } from "../../slices/authSlice";
import { settingsEndpoints } from "../api";

const { UPDATE_DISPLAY_PICTURE } = settingsEndpoints

export const updateDisplayPicture = (token, formData) => async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
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
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}