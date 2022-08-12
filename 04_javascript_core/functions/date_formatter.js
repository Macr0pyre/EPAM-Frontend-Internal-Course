export default function formatDate(date, format, selectedLanguage) {
    if (date === "") {
        return "Введите дату";
    }

    var date = new Date(date);

    return replaceFormat(format, date, selectedLanguage);
}

function replaceFormat(format, date, selectedLanguage = "english") {
    var localizations = {
        english: [["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]],
        russian: [["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]]
    };

    var months = localizations[selectedLanguage];

    format = format.replace(/(yy){1,2}|M{1,4}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}/g, function(match) {
        switch (match) {
            case 'yyyy':
                return date.getFullYear();
            case 'yy':
                return String(date.getFullYear()).slice(-2, );
            case 'MMMM':
                return months[0][date.getMonth()];
            case 'MMM':
                return months[1][date.getMonth()];
            case 'MM':
                return date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
            case 'M':
                return date.getMonth() + 1;
            case 'dd':
                return date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            case 'd':
                return date.getDate();
            case 'HH':
                return date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            case 'H':
                return date.getHours();
            case 'hh':
                return date.getHours() % 12 < 10 ? "0" + date.getHours() % 12 : date.getHours() % 12;
            case 'h':
                return date.getHours() % 12;
            case 'mm':
                return date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            case 'm':
                return date.getMinutes();
            case 'ss':
                return date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            case 's':
                return date.getSeconds();
        }
    })

    return format;
}

Date.prototype.format = function(formatString) {
    var date = this;
    return replaceFormat(formatString, date);
}