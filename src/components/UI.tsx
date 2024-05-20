import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";
import { FormInputs } from "../constants/Form";
import { FormDataContext } from "../context/FormDataContextProvider";

export default function UI() {
  const { theme } = useContext(ThemeContext);
  return <>{theme ? <Uno /> : <Dos />}</>;
}

function Uno() {
  const { formData, setFormData } = useContext(FormDataContext);
  return (
    <div className="bg-white text-violet-600 h-full">
      {FormInputs.map((item) => (
        <div key={item.key}>
          <input
            type={item.type}
            placeholder={item.placeholder}
            className=" w-full outline-none"
            value={formData[item.key as keyof typeof formData]} // Type assertion
            onChange={(e) => {
              setFormData({
                ...formData,
                [item.key]: e.target.value,
              });
            }}
          />
          <br />
        </div>
      ))}
    </div>
  );
}

function Dos() {
  const { formData, setFormData } = useContext(FormDataContext);
  return (
    <div className="bg-black text-white h-full">
      {FormInputs.map((item) => (
        <div key={item.key}>
          <input
            type={item.type}
            placeholder={item.placeholder}
            className=" w-full outline-none bg-transparent"
            value={formData[item.key as keyof typeof formData]} // Type assertion
            onChange={(e) => {
              setFormData({
                ...formData,
                [item.key]: e.target.value,
              });
            }}
          />
          <br />
        </div>
      ))}
    </div>
  );
}
