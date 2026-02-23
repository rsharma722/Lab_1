import { useState } from "react";

export type ValidationResult = {
ok: boolean;
messages: string[];
};

export function useFormInput(initialValue = "") {
const [value, setValue] = useState<string>(initialValue);
const [messages, setMessages] = useState<string[]>([]);

function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValue(e.target.value);
}

function clearMessages() {
    setMessages([]);
}

function validate(validator: (value: string) => ValidationResult): ValidationResult {
    const result = validator(value);
    setMessages(result.messages);
    return result;
}

return {
    value,
    setValue,
    onChange,
    messages,
    setMessages,
    clearMessages,
    validate,
};
}