// src/validationSchema/participateSchema.ts
"use client"
import * as yup from 'yup';

export const participationSchema = yup.object({
  email: yup.string().required("*-required").email("Invalid email address"),
  fullName: yup
    .string()
    .required("*-required")
    .min(4, "Minimum of four characters")
    .max(50, "Maximum of 50 characters"),
  mobileNumber: yup
    .string()
    .required("*-required")
    .matches(/^[\d\s-]+$/, "Invalid mobile number"),
  placeOfResidence: yup.string().required("*-required"),
  StateOfOrigin: yup.string().required("*-required"),
  socialMediaPlatform: yup.string().required("*-required"),
  socialMediaHandle: yup.string().required("*-required"),
  howDidYouFindOut: yup.array().min(1, "Select at least one option"),
  rulesAgreement: yup.boolean().oneOf([true], "*-required"),
});
