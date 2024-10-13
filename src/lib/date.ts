// utils/dateFormatter.ts

export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
       hour: '2-digit',
  minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }