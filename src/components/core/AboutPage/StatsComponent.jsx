import React from 'react'

const stats =[
    {count:'5K', label:'Active Students'},
    {count:'10+', label:'Mentors'},
    {count:'200+', label:'Courses'},
    {count:'50+', label:'Awards'},
]

const StatsComponent = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto p-[100px] flex flex-col md:flex-row lg:flex-row items-center justify-between'>
        {
            stats.map((stat,index)=>(
                <div key={index}>
                    <h2 className='text-4xl font-semibold'>{stat.count}</h2>
                    <p className='text-richblack-300 mt-2'>{stat.label}</p>
                </div>
            ))
        }
    </div>
  )
}

export default StatsComponent