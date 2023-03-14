const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
});

export function getRelativeTime(date: Date) {
    const daysDifference = Math.round(
        (date.getTime() - new Date().getTime()) / DAY_MILLISECONDS,
    );

    return rtf.format(daysDifference, 'day');
}