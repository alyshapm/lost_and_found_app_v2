export const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  
    return date.toLocaleDateString('en-US', options);
  };
  