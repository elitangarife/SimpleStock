import * as z from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser positivo'),
  stock: z.number().min(0, 'El stock no puede ser negativo'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
