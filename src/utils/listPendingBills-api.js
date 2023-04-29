import axios from "axios"
export {
    getPendingBills, sendRemindEmail
};

async function getPendingBills(currentPage, perPage) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/get-pending-bill?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}

async function sendRemindEmail(customerId, billId) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/${customerId}/${billId}/send-remind-email`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return 'Error';
    }
}