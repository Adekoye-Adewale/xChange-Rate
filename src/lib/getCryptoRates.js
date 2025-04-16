export async function getCryptoRates() {
        const cryptoIds = [
                'bitcoin',
                'ethereum',
                'ripple',
                'binancecoin',
                'cardano',
                'solana',
                'dogecoin',
                'polkadot',
                'tron',
                'litecoin',
                'polygon',
                'avalanche-2',
                'uniswap',
                'chainlink',
                'stellar',
                'vechain',
                'algorand',
                'tezos',
                'cosmos',
                'near'
        ].join(',');

        const fiatCurrencies = 'usd,eur,gbp,cad,ngn,jpy,cny,zar,aud,chf';

        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${fiatCurrencies}`;

        try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch crypto rates');
                return await res.json();
        } catch (error) {
                console.error('Crypto fetch error:', error);
                return null;
        }
}