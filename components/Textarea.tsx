import { ChangeEvent } from 'react';

interface TextareaProps {
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ placeholder, value, disabled, onChange }: TextareaProps) => {
  return (
    <textarea
      className="h-[6.5rem] min-h-[6.5rem] max-h-[6.5rem] rounded-2xl w-full bg-slate-500 text-xl p-4 text-white outline-none sm:text-4xl "
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    ></textarea>
  );
};

export default Textarea;
