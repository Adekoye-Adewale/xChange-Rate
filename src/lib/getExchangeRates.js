
export async function getExchangeRates() {
        const symbols = ['eur', 'gbp', 'ngn', 'jpy', 'cny', 'cad', 'aud', 'chf', 'inr', 'zar'];
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=${symbols.join(',')}`;

        try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch exchange rates');
                const data = await res.json();
                return data.usd;
        } catch (error) {
                console.error('Exchange rate fetch error:', error);
                return {};
        }
}
