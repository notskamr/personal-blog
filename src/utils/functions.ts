export function parseIsoDatetime(isoDatetime: string) {
    // Parse the input ISO datetime string
    const inputDatetime = new Date(isoDatetime);
    const currentDatetime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDatetime.valueOf() - inputDatetime.valueOf();

    // Define time units and their thresholds in milliseconds
    const timeUnits = [
        { unit: 'day', threshold: 365 * 24 * 60 * 60 * 1000 },
        { unit: 'hour', threshold: 60 * 60 * 1000 },
        { unit: 'minute', threshold: 60 * 1000 },
        { unit: 'second', threshold: 1000 }
    ];

    // Iterate through time units and find the appropriate one
    for (const { unit, threshold } of timeUnits) {
        if (timeDifference >= threshold) {
            const timeValue = Math.floor(timeDifference / threshold);
            return `${timeValue} ${unit}${timeValue > 1 ? 's' : ''} ago`;
        }
    }
    return "Just now";
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