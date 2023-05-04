import axios from "axios"
export {
    getAllPackages, getAllPackagesForCustomer, togglePackageStatus, addNewInternetPackage
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

async function getAllPackagesForCustomer() {
    try {
        const response = await axios.get(`http://localhost:8090/internet-packages/get-all-packages-for-customer`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        throw error;
    }
}

async function togglePackageStatus(internetPackageId) {
    try {
        const response = await axios.put(`http://localhost:8090/internet-packages/edit-package-status/${internetPackageId}`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        throw error;
    }
}

async function addNewInternetPackage(internetPackage) {
    try {
      const response = await axios.post('http://localhost:8090/internet-packages/add-package', internetPackage);
      return response.data;
    } catch(error) {s
      throw error;
    }
  }
  