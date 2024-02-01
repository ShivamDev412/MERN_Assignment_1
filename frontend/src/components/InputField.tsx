import { FC } from "react";
import { InputType } from "../Types/Input";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const InputField: FC<InputType> = ({
  id,
  labelText,
  register,
  errors,
  type,
}) => {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  return (
    <div className="my-4">
      <Label htmlFor={id} className="text-md">
        {labelText}
      </Label>
      {type === "date" ? (
        <Input
          type={type}
          id={id}
          {...register(id)}
          max={maxDate}
          className="mt-1"
        />
      ) : (
        <Input
          type={type}
          id={id}
          {...register(id)}
          className="mt-1"
        />
      )}
      {errors?.[id] && (
        <p className="text-red-600 italic text-md mt-1">
          {errors?.[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
