export function formatDateToISO(dateString: string): string {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
  
    // Convert to ISO format with milliseconds and timezone offset
    return date.toISOString();
  }
  
  export function formatISOToDate(isoString: string): string {
    // Create a Date object from the ISO string
    const date = new Date(isoString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
  
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  