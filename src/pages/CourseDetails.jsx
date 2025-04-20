export const CourseDetails = ()=>{

    const handleBuyCourse =()=>{
        if(token){
            BuyCourse()
            return
        }
    }

    return (
        <div className="flex items-center justify-center">
            <button className="bg-yellow-50 p-6"
                onClick={()=> handleBuyCourse()}
            >
                Buy Now
            </button>
        </div>
    )
}