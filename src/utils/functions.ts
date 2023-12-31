export function parseIsoDatetimeSince(isoDatetime: string) {
    // Parse the input ISO datetime string
    const inputDatetime = new Date(isoDatetime);
    const currentDatetime = new Date();
    // Calculate the time difference in milliseconds
    const timeDifference: number = Math.floor((currentDatetime.getTime() - inputDatetime.getTime()) / 1000);
    // Define time units and their thresholds in milliseconds
    const intervals: Record<string, number> = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };
    let counter: number;
    for (const unit in intervals) {
        counter = Math.floor(timeDifference / intervals[unit]);
        if (counter > 0) {
            if (counter === 1) {
                return `${counter} ${unit} ago`; // singular (1 day ago)
            } else {
                return `${counter} ${unit}s ago`; // plural (2 days ago)
            }
        }
    }
    return 'Just now';
}

function timeAgo(date: Date): string {
    const seconds: number = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals: Record<string, number> = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    let counter: number;

    for (const unit in intervals) {
        counter = Math.floor(seconds / intervals[unit]);

        if (counter > 0) {
            if (counter === 1) {
                return `${counter} ${unit} ago`; // singular (1 day ago)
            } else {
                return `${counter} ${unit}s ago`; // plural (2 days ago)
            }
        }
    }

    return 'Just now';
}


export function formatIsoDatetime(isoDatetime: string, withTime: boolean = false) {
    if (!isoDatetime) {
        return false
    }
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    const inputDatetime = new Date(isoDatetime);
    const day = inputDatetime.getDate();
    const month = months[inputDatetime.getMonth()];
    const year = inputDatetime.getFullYear();
    const addOrdinalSuffix = (day: number): string => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        const suffix = (day % 10 === 1) ? 'st' : (day % 10 === 2) ? 'nd' : (day % 10 === 3) ? 'rd' : 'th';
        return `${day}${suffix}`;
    };
    let formattedDate = `${addOrdinalSuffix(day)} ${month} ${year}`;
    if (withTime) {
        formattedDate += `, ${format12Hour(inputDatetime.getHours(), inputDatetime.getMinutes())}`;
    }
    return formattedDate;
}

export function format12Hour(hours: number, minutes: number): string {
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}${meridiem}`;
}
