export const formDate =(DateString)=>{
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const date=new Date(DateString)
    const formattedDate=date.toLocaleDateString('en-us',options)

    const hour= date.getHours()
    const minute=date.getMinutes()
    const period = hour >= 12 ? 'PM' : 'AM'
    const formattedTime = `${hour % 12}:${minute.toString().padStart(2, '0')} ${period}`

    return `${formattedDate} | ${formattedTime}`
}