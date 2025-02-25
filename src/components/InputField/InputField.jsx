import style from "./InputField.module.scss";

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  error,
  options = [],
}) => {
  //Hvis ikke placeholder angives bliver default = 'Indtast 'label''
  const defaultPlaceholder = placeholder || `Indtast ${label}`;

  //Hvis inputfeltet ikke er radio, select eller textarea
  if (type !== "radio" && type !== "select" && type !== "textarea") {
    return (
      <span className={style.InputStyling} style={{ display: "flex" }}>
        <label htmlFor={name}>{label}</label>
        <input
          autoComplete="on"
          id={name}
          placeholder={defaultPlaceholder}
          type={type}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        />
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </span>
    );
  }

  //Hvis inputfeltet er et textarea
  if (type === "textarea") {
    return (
      <span className={style.InputStyling} style={{ display: "flex" }}>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          placeholder={defaultPlaceholder}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
            minHeight: "100px",
            resize: "none",
            borderRadius: "5px",
          }}
        />
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </span>
    );
  }

  //Hvis inputfeltet er radio
  if (type === "radio") {
    return (
      <div className={style.InputStyling} style={{ display: "flex" }}>
        <label>{label}</label>
        {options.map((option) => (
          <div
            key={option.value}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              id={option.value}
              type="radio"
              name={name}
              value={option.value}
              {...register(name, validation)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </div>
    );
  }

  //Hvis inputfeltet er select
  if (type === "select") {
    return (
      <div className={style.InputStyling} style={{ display: "flex" }}>
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          {...register(name, validation)}
          style={{
            border: error ? "1px solid orange" : "1px solid #ccc",
          }}
        >
          <option value="">Vælg {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <h6 style={{ color: "orange" }}>{error.message}</h6>}
      </div>
    );
  }
};
