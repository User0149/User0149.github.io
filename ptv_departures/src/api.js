function hmacSHA1(message, key) {
    const CryptoJS = require('crypto-js');
    return CryptoJS.HmacSHA1(message, key).toString();
}

export default async function APIQuery(query_string) {
    const devid = "3003675";
    const devkey = "6687792e-89d3-4b03-bbf7-4d4daa063610";

    const base = "https://timetableapi.ptv.vic.gov.au"
    const request = `${query_string}${query_string.includes('?')?'&':'?'}devid=${devid}`;
    const url = `${base}${request}&signature=${hmacSHA1(request, devkey)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}