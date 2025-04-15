import toast from "react-hot-toast"
import { catalogData } from "../api"
import { apiconnector } from "../apiconnector"

export const getCatalogPageDetail = async (categoryId)=> {
    const toastId = toast.loading("Loading Catalog Page...")
    let result =[]

    try{
        const response = await apiconnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId})

        if(!response?.data?.success)
            throw new Error("Could not fetch category page data")
        
        result = response?.data
    }
    catch(error){
        console.log("CATALOGPAGEDATA_API ERROR: ", error)
        toast.error(error.message)

        result = error?.response?.data
    }
    toast.dismiss(toastId)
    return result
}