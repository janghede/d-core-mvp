import { ZodIssue } from "zod";

export const getIssues = (key: string | number, zodIssues?: ZodIssue[]) => {
  if (!isZodIssueArray(zodIssues)) return;
  if (!isStringOrNumber(key)) return;
  return zodIssues.filter((i) => i.path.includes(key)).map((i) => i.message);
};

const isStringOrNumber = (key: unknown): key is string | number => typeof key === "string" || typeof key === "number";

export const isZodIssueArray = (obj: unknown): obj is ZodIssue[] => Array.isArray(obj) && obj.every(isZodIssue);

export const isZodIssue = (obj: unknown): obj is ZodIssue => typeof obj === "object" && "message" in obj && "path" in obj && Array.isArray(obj.path) && obj.path.every((p) => typeof p === "string");
