import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students")

    const getRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    // create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentEnrolled),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length)
            }
        ]
    }

    // create options
    const options = {

    }

    return (
        <div className="bg-richblack-800 p-5 flex flex-col gap-2 w-[80%] rounded-lg">

            <p className="font-bold">Visualize</p>

            <div className="flex gap-2">
                <button
                    onClick={() => setCurrChart("students")}
                    className={`${currChart == "students" ? 
                        "text-yellow-50  bg-richblack-700" : "text-yellow-400"} font-bold px-2 py-1 rounded-lg`}
                >
                    Students
                </button>
                <button
                    onClick={() => setCurrChart("income")}
                    className={`${currChart == "income" ? 
                        "text-yellow-50  bg-richblack-600" : "text-yellow-400"} font-bold px-2 py-1 rounded-lg`}
                >
                    Income
                </button>
            </div>

            <div className="w-[50%] mx-auto">
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                />
            </div>
        </div>
    )
}