import axios from "axios"
export {
    getContractByCustomer, submitPackage
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

async function submitPackage(userName, packageId) {
    try {
        const response = await axios.get(`http://localhost:8090/contract/${userName}/${packageId}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}