import axios from 'axios'
export {
    getDashboardData
};

async function getDashboardData () {
    try {
        const response = await axios.get(`http://localhost:8090/admin`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        throw error;
    }
}
