
import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  caption: Yup.string()
    .required("Caption is required")
    .min(2, "Caption must be at least 2 characters long"),
});

