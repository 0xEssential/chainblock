import { parseEnv } from "znv";
import { z } from "zod";

export const {
  NEXT_PUBLIC_FINI_KEY,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_SIMPLEHASH_KEY,
} = parseEnv(
  {
    NEXT_PUBLIC_FINI_KEY: process.env.NEXT_PUBLIC_FINI_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_SIMPLEHASH_KEY: process.env.NEXT_PUBLIC_SIMPLEHASH_KEY,
  },
  {
    NEXT_PUBLIC_FINI_KEY: z.string(),
    NEXT_PUBLIC_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SIMPLEHASH_KEY: z.string(),
  }
);
