function hmacSHA1(message, key) {
    const CryptoJS = require('crypto-js');
    return CryptoJS.HmacSHA1(message, key).toString();
}

export default async function APIQuery(query_string) {
    const dev_id = localStorage.getItem("dev_id");
    const dev_key = localStorage.getItem("dev_key");

    const base = "https://timetableapi.ptv.vic.gov.au"
    const request = `${query_string}${query_string.includes('?')?'&':'?'}devid=${dev_id}`;
    const url = `${base}${request}&signature=${hmacSHA1(request, dev_key)}`;
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