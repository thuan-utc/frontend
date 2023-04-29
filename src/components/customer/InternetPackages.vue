<template>
    <div class="container-fluid">
        <h1 class="h3 mb-2 text-gray-800">Pick your packages</h1>
        <div class="row">
            <div class="col-6" id="tablePackages" v-for="p in tableData" :key="p.id" @click="this.selectedRow = p">
                <img src="../../assets/img/package.jpg" alt="package">
                <div class="featured__item__text">
                    <h6>Name: {{ p.packageName }}</h6>
                    <h6>Price: {{ p.price }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllPackages } from "../../utils/internetPackage-api"
export default {
    data() {
        return {
            searchId: '',
            searchName: '',
            searchPhone: '',
            searchEmail: '',
            searchAddress: '',
            searchCreatedDate: '',
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            totalPages: 0,
            tableData: [],
            selectedRow: {
                id: '',
                customerName: '',
                customerId: '',
                phoneNumber: '',
                email: '',
                address: ''
            },
            showFormSearch: false,
            isEditing: false,
            isLoading: false,
            isfirstSearchWithCriteria: true,
            statusMessage: '',
            showStatusMessage: false

        }
    },
    computed: {
        pages() {
            const start = Math.max(1, this.currentPage - 2);
            const end = Math.min(this.totalPages, start + 4);
            const pagesArray = [];
            for (let i = start; i <= end; i++) {
                pagesArray.push(i);
            }
            return pagesArray;
        }
    },
    methods: {
        getAllPackages() {
            getAllPackages().then((response) => {
                this.tableData = response;
                // this.totalItems = response.totalElements;
                // this.totalPages = response.totalPages;
            })
        },
        gotoPage(page) {
            this.currentPage = page;
            this.getPendingList();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getPendingList();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getPendingList();
            }
        },
    },
    mounted() {
        this.getAllPackages();
    }
}
</script>