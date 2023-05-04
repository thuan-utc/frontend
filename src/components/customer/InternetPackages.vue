<template>
    <div class="container-fluid">
        <h1 class="h3 mb-2 text-gray-800">Pick your packages</h1>
        <div class="row">
            <div class="col-4" id="tablePackages" v-for="p in tableData" :key="p.id" @click="this.selectedRow = p">
                <img src="../../assets/img/package.png" alt="package">
                <div class="featured__item__text">
                    <h6>Name: {{ p.packageName }}</h6>
                    <h6>Price: {{ p.price }}</h6>
                    <button class="btn btn-success" @click="submitPackage">Register now</button>
                    <!-- <button class="btn btn-secondary">Current use </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllPackagesForCustomer } from "../../utils/internetPackage-api"
import { submitPackage } from '../../utils/contract-api'
export default {
    data() {
        return {
            searchCreatedDate: '',
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            totalPages: 0,
            statusMessage: '',
            showStatusMessage: false,
            tableData: '',
            selectedRow: ''
        }
    },
    props: {
        userName: ''
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
            getAllPackagesForCustomer().then((response) => {
                this.tableData = response.content;
            })
        },
        submitPackage() {
            submitPackage(this.userName, this.selectedRow.id).then(response =>{
                if (response === "SUCCESS") {
                    alert("Register successfully");
                } else {
                    alert("Fail: " + response)
                }
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