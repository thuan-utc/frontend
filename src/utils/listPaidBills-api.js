import axios from "axios"
export {
    getPaidBills, getMyPaidBills
};

async function getPaidBills(currentPage, perPage) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/get-paid-bill?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}

async function getMyPaidBills(currentPage, perPage, userName) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/${userName}/get-paid-bill?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}