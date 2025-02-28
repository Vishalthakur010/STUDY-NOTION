import React from 'react'

const stats =[
    {count:'5K', label:'Active Students'},
    {count:'10+', label:'Mentors'},
    {count:'200+', label:'Courses'},
    {count:'50+', label:'Awards'},
]

const StatsComponent = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-between'>
        {
            stats.map((stat,index)=>(
                <div key={index}>
                    <h2>{stat.count}</h2>
                    <p>{stat.label}</p>
                </div>
            ))
        }
    </div>
  )
}

export default StatsComponent