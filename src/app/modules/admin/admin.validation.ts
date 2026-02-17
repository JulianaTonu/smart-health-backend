import z from "zod";

export const createAdminValidationSchema = z.object({
    password:z.string({error:"Password is required"}),
    admin: z.object({
         name : z.string({error:"name is required"}),
         email : z.string({error:"Email is required"}),
         contact : z.string({error:"Contact is required"}),

    })
})