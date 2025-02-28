import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import style from "./Form.module.scss";

export const Form = ({
  formArray,
  callback,
  buttonText,
  children,
  custom,
  customButton,
}) => {
  // useForm hook til at validere formen
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Funktion som håndterer submit af formen og medsender data i en callback
  function submit(data) {
    callback(data);
  }

  return (
    <form
      className={`${style.formStyling} ${style[custom]}`}
      onSubmit={handleSubmit(submit)}
    >
      {/* Mapper formArray */}
      {formArray.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
        />
      ))}
      <div>
        <input
          type="submit"
          className={`${style.submitButton} ${style[customButton]}`}
          value={buttonText}
        />
        {children}
      </div>
    </form>
  );
};
