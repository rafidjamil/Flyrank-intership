import { z } from "zod";

// Request Body Validation Schema
export const InputSchema = z.object({
  raw_title: z.string().min(1, "raw_title cannot be empty").max(200, "raw_title exceeds 200 characters")
});

// Response Model Schema
export const OutputSchema = z.object({
  canonical_title: z.string().min(1),
  department: z.enum(["Engineering", "Product", "Design", "Data", "Sales", "Marketing", "Operations", "Other"]),
  seniority: z.enum(["Intern", "Junior", "Mid", "Senior", "Lead", "Executive", "Unknown"]),
  confidence: z.number().min(0).max(1),
  reason: z.string().min(1)
});