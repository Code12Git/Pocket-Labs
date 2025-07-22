import { z } from 'zod';

const createExpenseValidation = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be positive"),

  category: z
    .string()
    .min(1, { message: 'Category is required' }),

  date: z
    .string()
    .min(1, { message: 'Date is required' }),

  notes: z.string().optional(),
});

export default createExpenseValidation;
