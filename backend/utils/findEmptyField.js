const findEmptyField = (fields, required = []) => {
  for (const field of required) {
    if (!fields[field]) {
      return `${field} is required.`;
    }
  }
  return null;
};

export default findEmptyField;
