export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: any = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// Example usage
// const dateString = "2024-10-07";
// const formattedDate = formatDate(dateString);
// console.log(formattedDate); // Output: October 07, 2024
