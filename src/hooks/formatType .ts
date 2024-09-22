export const formatType = (type: string) => {
  return type
    .replace(/_/g, ' ')
    .toLowerCase() 
    .replace(/\b\w/g, char => char.toLowerCase());
};
