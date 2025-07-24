export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validatePositiveNumber = (value: number): boolean => {
  return value > 0;
};

export const validateNonNegativeNumber = (value: number): boolean => {
  return value >= 0;
}; 