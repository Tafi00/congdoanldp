import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { clsx } from "clsx";
import "./CustomSelect.css";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type CustomSelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel?: string;
  name?: string;
  className?: string;
  onValueChange?: (value: string) => void;
};

export function CustomSelect({
  options,
  value,
  defaultValue,
  placeholder = "Chọn một giá trị",
  ariaLabel,
  name,
  className,
  onValueChange,
}: CustomSelectProps) {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      name={name}
      onValueChange={onValueChange}
    >
      <Select.Trigger
        className={clsx("custom-select", className)}
        aria-label={ariaLabel ?? placeholder}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="custom-select__icon">
          <ChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="custom-select__content"
          position="popper"
          sideOffset={6}
        >
          <Select.ScrollUpButton className="custom-select__scroll">
            <ChevronUp size={17} />
          </Select.ScrollUpButton>
          <Select.Viewport className="custom-select__viewport">
            {options.map((option) => (
              <Select.Item
                className="custom-select__item"
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="custom-select__check">
                  <Check size={17} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="custom-select__scroll">
            <ChevronDown size={17} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
