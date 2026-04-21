export const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).format(new Date(date))
}