import { FC } from "react";
import { InputSelect as InputSelectProps } from "../Types/Input";
const InputSelect: FC<InputSelectProps> = ({
  label,
  data,
  register,
  errors,
  id,
}) => {
  return (
    <div className="w-full my-4">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...register(id)}
        className="flex mt-1 h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 appearance-none"
      >
        {data.map((value) => (
          <option
            key={value.value}
            value={value.value}
            className="py-2 text-xl text-background bg-popover hover:bg-accent hover:text-accent-foreground"
          >
            {value.title}
          </option>
        ))}
      </select>
      {errors[id] && (
        <p className="text-red-600 italic text-md mt-1">
          {errors?.[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputSelect;
