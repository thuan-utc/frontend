import axios from "axios"
export {
    getAllPackages
};

async function getAllPackages() {
    try {
        const response = await axios.get(`http://localhost:8090/internet-packages/get-all-packages`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        throw error;
    }
}