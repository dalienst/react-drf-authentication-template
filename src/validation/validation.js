import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password cannot be less than 5 characters")
    .required("This field is required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 5 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password cannot be less than 5 characters")
    .required("This field is required")
});

const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
  email: Yup.string().email("Invalid email"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  bio: Yup.string().min(2, 'The bio is too short!')
});

const ProjectSchema = Yup.object().shape({
  contact:Yup.string().required("Contact is required")
})

const VehicleSchema = Yup.object().shape({
  registration: Yup.string().min(4, "Length should be more than 4").max(15, 'Invalid').required("Number Plate is required"),
  chasis: Yup.string().min(4, "Length should be more than 4").max(15, 'Invalid').required("Chasis Number is required")
})

export { RegistrationSchema, ProfileSchema, LoginSchema, ProjectSchema, VehicleSchema };
