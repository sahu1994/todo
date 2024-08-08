// Function to generate initials from a name
export const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map((word) => word[0]).join('');
    return initials.substring(0, 2).toUpperCase(); // Only the first two letters
  };
  
  // Function to generate a random background color
  export const getRandomColor = () => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  