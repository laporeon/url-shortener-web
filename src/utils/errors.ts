export const errors: { [key: string]: string } = {
  'Invalid URL format. Please provide a valid URL (e.g., https://example.com).':
    'Formato de URL inválido.',
  'Expiration date must be a future date (format: yyyy-MM-dd).':
    'A data de expiração precisa ser uma data futura.'
}

export function getErrorMessage(message: string): string {
  return errors[message] || message
}
