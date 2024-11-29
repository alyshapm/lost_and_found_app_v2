export const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  
    return date.toLocaleDateString('en-US', options);
  };
  

    // Helper function to format date and time
export const formatDateTime = (dateString) => {
      const options = { 
        year: "numeric", 
        month: "short", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit" 
      };
      return new Date(dateString).toLocaleString(undefined, options);
    };