import z from "zod";


export const createDoctorValidationSchema = z.object({

    password: z.string(),
    doctor: z.object({
        name: z.string({ error: "Name is required" }),
        email: z.string({ error: "Email is required" }),
        contact: z.string({ error: "Contact is required" }),
        gender: z.enum(["MALE", "FEMALE"]),
        appointmentFee: z.number({ error: "Fee is required" }),
        qualification: z.string(),
        currentWorkingPlace: z.string(),
        designation: z.string(),
        profilePhoto: z.string().optional(),
    }),
})