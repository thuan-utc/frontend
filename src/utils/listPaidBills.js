import axios from "axios"
export {
    getPaidBills
};

async function getPaidBills() {
    try {
        const response = await axios.get(`http://localhost:8090/bill/get-paid-bill`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}