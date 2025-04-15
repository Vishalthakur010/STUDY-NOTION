import { useParams } from "react-router-dom"
import { Footer } from "../components/common/Footer"
import { useEffect, useState } from "react"
import { getCatalogPageDetail } from "../services/operations/pageAndComponentData"
import { apiconnector } from "../services/apiconnector"
import { categories } from "../services/api"

export const Catalog = () => {

    const { catalogName } = useParams()
    const [categoryId, setCategoryId] = useState("")
    const [catalogPageData, setCatalogPageData] = useState(null)

    useEffect(() => {
        const getCategories = async () => {
            const res = await apiconnector("GET", categories.CATEGORIES_API)
            const category_id =
                res?.data?.allCategory?.filter((ct) => ct.name
                    .split(" ").join("-").toLowerCase() === catalogName)[0]?._id

            if (category_id) {
                setCategoryId(category_id)
            }
        }
        getCategories()
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageDetail(categoryId)
                console.log("Catalog Page Data: ", res)
                setCatalogPageData(res)
            }
            catch (error) {
                console.log("Error in fetching category details: ", error)
            }
        }
        getCategoryDetails()
    }, [categoryId])
                                    // 40 min
    return (
        <div className="text-white">
            <div>
                <p></p>
                <p></p>
                <p></p>
            </div>

            <div>

                {/* section 1 */}
                <div>
                    <div>
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>
                    {/* <CourseSlider /> */}
                </div>

                {/* section 2 */}
                <div>
                    <p>Top Courses</p>
                    {/* <CourseSlider /> */}
                </div>

                {/* section 3 */}
                <div>
                    <p>Frequiently Bought Together</p>
                </div>

            </div>

            <Footer />

        </div>
    )
}