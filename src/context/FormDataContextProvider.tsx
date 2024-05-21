import React from "react";
import { defaultContextValue, FormDataContextType } from "../@types/FormData";

export const FormDataContext =
  React.createContext<FormDataContextType>(defaultContextValue);

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
