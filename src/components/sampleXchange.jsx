'use client';
import { useEffect, useState } from 'react';
import { convertCurrency } from '@/lib/currencyConverter';

export default function SampleTest() {
        const [conversion, setConversion] = useState(null);

        useEffect(() => {
                async function fetchConversion() {
                        const result = await convertCurrency({
                                from: 'USD',
                                to: 'NGN',
                                amount: 100,
                        });
                        setConversion(result);
                }

                fetchConversion();
        }, []);

        return (
                <div className='text-neutral-950 mt-5'>
                        <h2>Currency Conversion</h2>
                        {conversion ? (
                                <p>
                                        100 USD = {conversion.rates?.NGN?.rate_for_amount} NGN
                                </p>
                        ) : (
                                <p>Loading conversion...</p>
                        )}
                </div>
        );
}
