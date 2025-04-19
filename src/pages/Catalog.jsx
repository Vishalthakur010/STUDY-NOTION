import { useParams } from "react-router-dom"
import { Footer } from "../components/common/Footer"
import { useEffect, useState } from "react"
import { getCatalogPageDetail } from "../services/operations/pageAndComponentData"
import { apiconnector } from "../services/apiconnector"
import { categories } from "../services/api"
import { CourseCard } from "../components/core/Catalog/CourseCard"
import { CourseSlider } from "../components/core/Catalog/CourseSlider"

export const Catalog = () => {
    const { catalogName } = useParams()
    const [categoryId, setCategoryId] = useState("")
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState("Most Popular")

    useEffect(() => {
        const getCategories = async () => {
            const res = await apiconnector("GET", categories.CATEGORIES_API)
            const category_id =
                res?.data?.allCategory?.filter((ct) => ct.name
                    .split(" ").join("-").toLowerCase() === catalogName)[0]?._id

            setCategoryId(category_id)
        }
        getCategories()
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageDetail(categoryId)
                console.log("Catalog Page Data: ", res.data)
                if (res.success) {
                    setCatalogPageData(res.data)
                }
            }
            catch (error) {
                console.log("Error in fetching category details: ", error)
            }
        }
        if (categoryId) {
            getCategoryDetails()
        }
    }, [categoryId])

    return (
        <div className="text-white">

            <div className=" p-14 bg-richblack-800 flex flex-col justify-center gap-4 ">
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `}
                    <span className="text-yellow-50 text-base font-semibold">
                        {catalogPageData?.selectedCategory?.name}
                    </span>
                </p>
                <p className="text-4xl text-richblack-25 font-semibold">
                    {catalogPageData?.selectedCategory?.name}
                </p>
                <p className="text-richblack-200 text-lg">
                    {catalogPageData?.selectedCategory?.description}
                </p>
            </div>

            <div>

                {/* section 1 */}
                <div className="m-14 flex flex-col gap-2">
                    <p className="text-4xl font-bold text-richblack-25">
                        Courses to get you started
                    </p>
                    <div className="flex gap-6 m-4 text-base ">
                        <p className={`${selectedFilter == "Most Popular" && "text-yellow-5 border-b"} cursor-pointer`}
                            onClick={() => setSelectedFilter("Most Popular")}
                        >
                            Most Popular
                        </p>
                        <p className={`${selectedFilter == "New" && "text-yellow-5 border-b"} cursor-pointer`}
                            onClick={() => setSelectedFilter("New")}
                        >
                            New
                        </p>
                    </div>

                    <div>
                        <CourseSlider courses={catalogPageData?.selectedCategory?.course} />
                    </div>
                </div>

                {/* section 2 */}
                <div className="m-14 flex flex-col gap-2">
                    <p
                        className="text-4xl text-richblack-25 font-semibold mb-4"
                    >
                        Top Courses in {catalogPageData?.selectedCategory?.name}
                    </p>
                    <div>
                        <CourseSlider courses={catalogPageData?.differentCategory?.course} />
                    </div>
                </div>

                {/* section 3 */}
                <div className="m-14 flex flex-col gap-2">
                    <p className="text-4xl text-richblack-25 font-semibold">
                        Frequiently Bought
                    </p>

                    <div className="">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                            {
                                catalogPageData?.mostSellingCourses.slice(0, 4)
                                    .map((course, index) => (
                                        <CourseCard course={course} key={index} Height={"h-[400px]"} /> //51
                                    ))
                            }
                        </div>
                    </div>
                </div>

            </div>

            <Footer />

        </div>
    )
}