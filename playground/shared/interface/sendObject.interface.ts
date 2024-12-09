import { z } from "zod";

export const ZUser = z.object({
  id: z.string().regex(/^\w{2}\d{5}$/, "Användar-ID måste uppfylla formatet 'XX12345'"),
  email: z.string().email("Måste vara en giltig e-postadress.").endsWith("@edu.stockholm.se", "E-post måste tillhöra '@edu.stockholm.se'"),
});

export const ZDbUser = z.object({
  id: z.string().regex(/^\w{2}\d{5}$/, "Användar-ID måste uppfylla formatet 'XX12345'"),
  email: z.string().email("Måste vara en giltig e-postadress.").endsWith("@edu.stockholm.se", "E-post måste tillhöra '@edu.stockholm.se'"),
  name: z.string().min(1, "Namn måste vara minst 1 tecken långt").nullable(),
});
