import React from "react";

export const FormDataContext = React.createContext({});
export default function FormDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    filename: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
}
