
export async function convertCurrency({ from, to, amount, language = "en" }) {
        const url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${from}&to=${to}&amount=${amount}&language=${language}`;

        const options = {
                method: 'GET',
                headers: {
                        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
                },
        };

        try {
                const response = await fetch(url, options);

                if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                return {
                        rate: data.rates?.[to]?.rate,
                        amountConverted: data.rates?.[to]?.rate_for_amount,
                        base: data.base_currency_code,
                        target: to,
                        raw: data, 
                };
        } catch (error) {
                console.error("Currency conversion failed:", error.message);
                return null;
        }
}

export const xChangeRate = async (fromCurrency, toCurrency, amount) => {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        if (!res.ok) throw new Error("Failed to fetch exchange rate");
        return res.json();
};

