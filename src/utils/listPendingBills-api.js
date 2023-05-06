import axios from "axios"
export {
    getPendingBills, getMyPendingBills, sendRemindEmail, payBill
};

async function getPendingBills(currentPage, perPage) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/get-pending-bill?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch (error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}

async function getMyPendingBills(currentPage, perPage, userName) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/${userName}/get-pending-bill?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch (error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}

async function sendRemindEmail(userName, billId) {
    try {
        const response = await axios.get(`http://localhost:8090/bill/${userName}/${billId}/send-remind-email`);
        return response.data;
    } catch (error) {
        alert('An error occurred: ' + error.message);
        return 'Error';
    }
}

async function payBill(billId) {
    const response = await axios.get(`http://localhost:8090/bill/${billId}/pay`);
    return response.data;
}