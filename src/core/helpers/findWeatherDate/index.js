export const findWeatherDate = (weatherDate) => {
    const now = new Date();
    const today = now.getDate();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDate = new Date(weatherDate);
    const targetDay = targetDate.getDate();
    const differenceInDays = targetDay - today;

    if (differenceInDays === 0) {
        return 'Today';
    } else if (differenceInDays === 1) {
        return 'Tomorrow';
    } else if (differenceInDays > 1 && differenceInDays < 7) {
        return daysOfWeek[targetDate.getDay()];
    } else {
        return targetDate.toDateString();
    }
}