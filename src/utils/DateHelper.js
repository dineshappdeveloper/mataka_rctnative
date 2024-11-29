// DateHelper.js
/**
 * Format a date string into 'MMM dd yyyy' format.
 * @param {string} date - The date string in ISO format.
 * @returns {string} - The formatted date string.
 */
export const formatDateString = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };
  