import { Plus, Minus } from 'lucide-react';
import React from 'react';

interface NumberStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
}

export default function NumberStepper({ value, onChange, min = 0, max = Infinity, step = 1, prefix = '', suffix = '' }: NumberStepperProps) {
    const handleDecrement = () => {
        if (value - step >= min) {
            onChange(Number((value - step).toFixed(2)));
        }
    };

    const handleIncrement = () => {
        if (value + step <= max) {
            onChange(Number((value + step).toFixed(2)));
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            onChange(val);
        } else if (e.target.value === '') {
            onChange(0);
        }
    };

    return (
        <div className="flex items-center bg-background border border-white/10 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={handleDecrement}
                className="p-3 text-muted hover:text-white hover:bg-white/5 transition-colors border-r border-white/10"
                disabled={value <= min}
            >
                <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center justify-center relative px-2">
                {prefix && <span className="text-muted absolute left-3 pointer-events-none">{prefix}</span>}
                <input
                    type="number"
                    value={value}
                    onChange={handleInput}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-full bg-transparent text-center font-medium text-white focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${prefix ? 'pl-4' : ''} ${suffix ? 'pr-8' : ''}`}
                />
                {suffix && <span className="text-muted text-sm absolute right-3 pointer-events-none">{suffix}</span>}
            </div>
            <button
                type="button"
                onClick={handleIncrement}
                className="p-3 text-muted hover:text-white hover:bg-white/5 transition-colors border-l border-white/10"
                disabled={value >= max}
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
