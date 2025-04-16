'use client';
import React, { useEffect, useState } from 'react';
import currencyMap from '@/lib/currencyMap';
import { xChangeRate } from '@/lib/currencyConverter';
import supportedBaseCurrencies from '@/lib/supportedBaseCurrencies';

export default function HomeHeroForm() {

        const [fromFigure, setFromFigure] = useState(1);
        const [toFigure, setToFigure] = useState('0');
        const [fromCurrency, setFromCurrency] = useState('USD');
        const [toCurrency, setToCurrency] = useState('CAD');
        const [xchangeRateTime, setXchangeRateTime] = useState('');

        const handleConvert = async () => {
                if (!supportedBaseCurrencies.includes(fromCurrency)) {
                        console.warn(`${fromCurrency} is not supported as a base currency`);
                        setToFigure('0');
                        return;
                }

                try {
                        const result = await xChangeRate(fromCurrency, toCurrency, fromFigure);
                        const rate = parseFloat(result?.rates?.[toCurrency]);
                        setToFigure(isNaN(rate) ? '0' : rate.toFixed(2));
                        setXchangeRateTime(new Date().toLocaleTimeString());
                } catch (error) {
                        console.error('Conversion failed:', error);
                        setToFigure('0');
                }
        };

        useEffect(() => {
                handleConvert();
        }, [fromFigure, fromCurrency, toCurrency]);

        return (
                <div className='bg-amber-50 p-10 rounded-2xl border-solid border-2 border-amber-200 overflow-hidden'>
                        <div className='flex flex-wrap justify-between gap-2'>
                                <XChangeInput
                                        title="You have"
                                        htmlFor="youHave"
                                        value={fromFigure}
                                        onChange={setFromFigure}
                                        selectedCurrency={fromCurrency}
                                        onCurrencyChange={setFromCurrency}
                                        readOnly={false}
                                />
                                <XChangeInput
                                        title="Converted to"
                                        htmlFor="convertTo"
                                        value={toFigure}
                                        onChange={() => { }}
                                        selectedCurrency={toCurrency}
                                        onCurrencyChange={setToCurrency}
                                        readOnly={true}
                                />
                        </div>
                        <div className='grid text-neutral-950 mt-5'>
                                <div>
                                        <XchangeRate priceCurrency={fromCurrency} priceFigure={fromFigure} />
                                        <span>=</span>
                                        <XchangeRate priceCurrency={toCurrency} priceFigure={toFigure} />
                                </div>
                                <div>
                                        <p className="text-sm text-neutral-700 mt-1">
                                                Market exchange rate at {xchangeRateTime || 'Fetching...'}
                                        </p>
                                </div>
                        </div>
                </div>
        )
}

const XChangeInput = ({
        title,
        htmlFor,
        value,
        onChange,
        selectedCurrency,
        onCurrencyChange,
        readOnly = false,
}) => {

        return (
                <div className="flex justify-between w-full md:max-w-96 border-solid border-2 border-amber-200 rounded-md">
                        <div className="grid py-2.5 px-2 w-full">
                                <label htmlFor={htmlFor} className="text-xs text-neutral-700">
                                        {title}
                                </label>
                                <input
                                        type="number"
                                        id={htmlFor}
                                        min="0"
                                        value={value}
                                        onChange={(e) => onChange(Number(e.target.value))}
                                        className="text-3xl text-neutral-950 w-full outline-0"
                                        readOnly={readOnly}
                                />
                        </div>
                        <div className="flex p-2 bg-amber-200 text-neutral-950 text-xl">
                                <select
                                        value={selectedCurrency}
                                        onChange={(e) => onCurrencyChange(e.target.value)}
                                        className="outline-none max-w-[100px] w-full"
                                >
                                        {Object.entries(currencyMap)
                                                .filter(([code]) => supportedBaseCurrencies.includes(code))
                                                .map(([code, name]) => (
                                                        <option key={code} value={code}>
                                                                {code}
                                                        </option>
                                                ))}
                                </select>
                        </div>
                </div>
        );
};

const XchangeRate = ({ priceFigure, priceCurrency }) => (
        <span>{Number(priceFigure).toLocaleString()} {priceCurrency}</span>
);