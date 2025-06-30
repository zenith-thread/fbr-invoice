import React from "react";

const FormInput = React.memo(
  ({ label, name, value, type, placeholder, onChangeHandler }) => {
    return (
      <div className="flex flex-col gap-3 my-5">
        <label className="font-medium text-lg text-[#eee]">{label}</label>
        <input
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className="w-full rounded-xl bg-white px-4 py-2 text-xl outline-none"
          required
        />
      </div>
    );
  }
);

export default FormInput;
