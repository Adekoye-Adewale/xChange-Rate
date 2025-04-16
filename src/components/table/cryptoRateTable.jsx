'use client';
import { useEffect, useState } from 'react';
import { getCryptoRates } from '@/lib/getCryptoRates';
import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const fiatList = ['USD', 'EUR', 'GBP', 'CAD', 'NGN', 'JPY', 'CNY', 'ZAR', 'AUD', 'CHF'];

const cryptoNameMap = {
        bitcoin: 'BTC',
        ethereum: 'ETH',
        ripple: 'XRP',
        binancecoin: 'BNB',
        cardano: 'ADA',
        solana: 'SOL',
        dogecoin: 'DOGE',
        polkadot: 'DOT',
        tron: 'TRX',
        litecoin: 'LTC',
        polygon: 'MATIC',
        'avalanche-2': 'AVAX',
        uniswap: 'UNI',
        chainlink: 'LINK',
        stellar: 'XLM',
        vechain: 'VET',
        algorand: 'ALGO',
        tezos: 'XTZ',
        cosmos: 'ATOM',
        near: 'NEAR',
};

export default function CryptoRateTable() {
        const [rates, setRates] = useState(null);
        const [page, setPage] = useState(0);

        const cryptosPerPage = 10;
        const cryptoKeys = Object.keys(cryptoNameMap);
        const totalPages = Math.ceil(cryptoKeys.length / cryptosPerPage);

        useEffect(() => {
                async function fetchRates() {
                        const data = await getCryptoRates();
                        setRates(data);
                }
                fetchRates();
        }, []);

        const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
        const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

        const paginatedCryptos = cryptoKeys.slice(
                page * cryptosPerPage,
                (page + 1) * cryptosPerPage
        );

        return (
                <div className="py-10 px-5">
                        <h2 className="text-xl font-semibold mb-4">Live Crypto Exchange Rates</h2>
                        {rates ? (
                                <>
                                        <Table className={'border-solid border-2 border-amber-200 rounded-md'}>
                                                <TableHeader className={'bg-amber-500'}>
                                                        <TableRow>
                                                                <TableHead>Currency</TableHead>
                                                                {fiatList.map((currency) => (
                                                                        <TableHead key={currency}>{currency}</TableHead>
                                                                ))}
                                                        </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                        {paginatedCryptos.map((crypto) => (
                                                                <TableRow key={crypto}>
                                                                        <TableCell className="font-medium">
                                                                                {cryptoNameMap[crypto] || crypto.toUpperCase()}
                                                                        </TableCell>
                                                                        {fiatList.map((fiat) => (
                                                                                <TableCell key={fiat}>
                                                                                        {rates[crypto]?.[fiat.toLowerCase()]?.toLocaleString(undefined, {
                                                                                                style: 'currency',
                                                                                                currency: fiat,
                                                                                                maximumFractionDigits: 2,
                                                                                        }) ?? '—'}
                                                                                </TableCell>
                                                                        ))}
                                                                </TableRow>
                                                        ))}
                                                </TableBody>
                                        </Table>

                                        <div className="flex items-center justify-between mt-4">
                                                <Button onClick={handlePrev} disabled={page === 0}>
                                                        Previous
                                                </Button>
                                                <p className="text-sm text-muted-foreground">
                                                        Page {page + 1} of {totalPages}
                                                </p>
                                                <Button onClick={handleNext} disabled={page === totalPages - 1}>
                                                        Next
                                                </Button>
                                        </div>
                                </>
                        ) : (
                                <p>Loading exchange rates...</p>
                        )}
                </div>
        );
}
