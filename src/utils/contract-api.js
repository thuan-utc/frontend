import axios from "axios"
export {
    getContractByCustomer
};

async function getContractByCustomer(currentPage, perPage, userName) {
    try {
        const response = await axios.get(`http://localhost:8090/contract/${userName}?pageNumber=${currentPage}&pageSize=${perPage}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}