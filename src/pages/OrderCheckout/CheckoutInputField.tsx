type Props = {
    label: string;
    value: string;
    type?: string;
    error?: string;
    onChange: (val: string) => void;
};

export default function CheckoutInputField({ label, value, type = "text", error, onChange }: Props) {
    return (
        <label className="text-xs">
            {label}
            <input
                type={type}
                placeholder={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input primary-input"
            />
            {error && <span className="input-error">{error}</span>}
        </label>
    );
}