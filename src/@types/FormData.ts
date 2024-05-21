interface FormData {
  name: string;
  email: string;
  phone: string;
  filename: string;
}

export interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  filename: "",
};

export const defaultContextValue: FormDataContextType = {
  formData: defaultFormData,
  setFormData: () => {},
};
