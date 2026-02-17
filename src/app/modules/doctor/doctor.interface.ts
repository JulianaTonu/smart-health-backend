export type createDoctorInput = {
  name: string;
  email: string;
  password: string;
  contact: string;
  gender: "MALE" | "FEMALE";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
//   profilePhoto?: string;
};
