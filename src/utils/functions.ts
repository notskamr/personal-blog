export function parseIsoDatetime(isoDatetime: string) {
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


export function formatIsoDatetime(isoDatetime: string) {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    // Parse the input ISO datetime string
    const inputDatetime = new Date(isoDatetime);

    // Get day, month, and year
    const day = inputDatetime.getDate();
    const month = months[inputDatetime.getMonth()];
    const year = inputDatetime.getFullYear();

    // Function to add ordinal suffix to the day
    const addOrdinalSuffix = (day: number) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    // Format and return the result
    const formattedDate = `${addOrdinalSuffix(day)} ${month} ${year}`;
    return formattedDate;
}