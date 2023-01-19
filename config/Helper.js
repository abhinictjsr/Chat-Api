var Helper = {};
Helper.response = (rescode,message,data,res)=>{
    const status = rescode == 200 ? true : false;
    res.status(rescode).json({data:data,message:message,status:status});
}
Helper.getDate = (dateformat)=> {
    // const currentDayOfMonth = (dateformat.getDate() < 10) ? '0'+dateformat.getDate(): dateformat.getDate();
    const currentMonth = ((dateformat.getMonth()+1) < 10) ? '0'+(dateformat.getMonth()+1): (dateformat.getMonth()+1); // Be careful! January is 0, not 1
    // const currentYear = (dateformat.getFullYear() < 10) ? '0'+dateformat.getFullYear(): dateformat.getFullYear();
    const currentDayOfMonth = dateformat.getDate();
    // const currentMonth = dateformat.getMonth(); // Be careful! January is 0, not 1
    const currentYear = dateformat.getFullYear();
    const currentHour = (dateformat.getHours() < 10) ? '0'+dateformat.getHours(): dateformat.getHours();
    const currentMinute = (dateformat.getMinutes() < 10) ? '0'+dateformat.getMinutes(): dateformat.getMinutes();
    const currentSeconds = (dateformat.getSeconds() < 10) ? '0'+dateformat.getSeconds(): dateformat.getSeconds();
    // const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    const dateString = currentYear + "-" + (currentMonth) + "-" + currentDayOfMonth;
    const timeString =  currentHour+":"+currentMinute+":"+currentSeconds;
    return {created_date:dateString,created_time:timeString};
}
module.exports = Helper