import { z } from "zod";

export const identitySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  identity_data: z.object({
    email: z.string().email(),
    sub: z.string(),
  }),
  provider: z.string(),
  last_sign_in_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const emailUnvalidatedUserSchema = z.object({
  id: z.string(),
  aud: z.literal("authenticated"),
  role: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  confirmation_sent_at: z.string().optional(),
  app_metadata: z.object({
    provider: z.string(),
    providers: z.array(z.string()),
  }),
  user_metadata: z.record(z.any()).optional(),
  identities: z.array(identitySchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  aud: z.literal("authenticated"),
  role: z.string(),
  email: z.string().email(),
  email_confirmed_at: z.string().optional(),
  phone: z.string().optional(),
  confirmation_sent_at: z.string().optional(),
  confirmed_at: z.string().optional(),
  last_sign_in_at: z.string().optional(),
  app_metadata: z.object({
    provider: z.string(),
    providers: z.array(z.string()),
  }),
  user_metadata: z.record(z.any()),
  identities: z.array(identitySchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export const sessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: userSchema.optional(),
  token_type: z.string(),
  expires_in: z.number(),
  expires_at: z.number().optional(),
});

export const authSchema = z.object({
  user: userSchema,
  session: sessionSchema,
});

export const simpleUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Infer the types
export type AuthType = z.infer<typeof authSchema>;
export type SimpleUserType = z.infer<typeof simpleUserSchema>;
export type EmailUnvalidatedUserType = z.infer<
  typeof emailUnvalidatedUserSchema
>;
export type UserType = z.infer<typeof userSchema>;
export type SessionType = z.infer<typeof sessionSchema>;
