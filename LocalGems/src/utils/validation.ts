// Validation utility functions

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

/**
 * Validate display name
 */
export const isValidDisplayName = (name: string): { isValid: boolean; message?: string } => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Display name must be at least 2 characters long' };
  }
  
  if (trimmedName.length > 50) {
    return { isValid: false, message: 'Display name must be less than 50 characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate location name
 */
export const isValidLocationName = (name: string): { isValid: boolean; message?: string } => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 3) {
    return { isValid: false, message: 'Location name must be at least 3 characters long' };
  }
  
  if (trimmedName.length > 100) {
    return { isValid: false, message: 'Location name must be less than 100 characters' };
  }
  
  return { isValid: true };
};

/**
 * Validate location description
 */
export const isValidLocationDescription = (description: string): { isValid: boolean; message?: string } => {
  const trimmedDescription = description.trim();
  
  if (trimmedDescription.length < 10) {
    return { isValid: false, message: 'Description must be at least 10 characters long' };
  }
  
  if (trimmedDescription.length > 500) {
    return { isValid: false, message: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
