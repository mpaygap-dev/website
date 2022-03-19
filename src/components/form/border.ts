import { FieldStatus } from './field-context';

export const borderByStatus: Record<FieldStatus, string> = {
  error: 'border-red-500',
  warning: 'border-yellow-500',
  success: 'border-green-500',
};
