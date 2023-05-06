<template>
    <div class="container-fluid">

        <!-- Page Heading -->
        <h1 class="h3 mb-2 text-gray-800">Manage Internet Packages</h1>
        <div class="row">
            <!-- DataTales Example -->
            <div class="card shadow mb-4 col-9">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary"> All Internet Packages </h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div class="dataTables_length" id="dataTable_length"><label>Show <select
                                                name="dataTable_length" aria-controls="dataTable"
                                                class="custom-select custom-select-sm form-control form-control-sm"
                                                v-model="this.perPage">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select> entries</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-6">
                                    <div id="dataTable_filter" class="dataTables_filter"><label>Search:<input type="search"
                                                class="form-control form-control-sm" placeholder=""
                                                aria-controls="dataTable"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <table class="table table-bordered table-hover table-striped" id="dataTable"
                                        width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Package Id</th>
                                                <th>Package Name</th>
                                                <th>Speed</th>
                                                <th>Data Limit</th>
                                                <th>Created Date</th>
                                                <th>Price</th>
                                                <th>Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="internetPackage in tableData" :key="internetPackage.id"
                                                @click="this.selectedRow = internetPackage">
                                                <td>{{ internetPackage.id }}</td>
                                                <td>{{ internetPackage.packageName }}</td>
                                                <td>{{ internetPackage.speed }} Mbps</td>
                                                <td>{{ internetPackage.dataLimit }} G</td>
                                                <td>{{ new Date(internetPackage.createdDate).toISOString().slice(0, 10) }}
                                                </td>
                                                <td>{{ internetPackage.price }}K vnd</td>
                                                <td v-if="internetPackage.deleted"> Deactivated </td>
                                                <td v-else> Activated </td>
                                                <td v-if="internetPackage.deleted">
                                                    <button class="btn-info" @click="togglePackageStatus">Activate</button>
                                                </td>
                                                <td v-else> <button class="btn-danger"
                                                        @click="togglePackageStatus">Disable</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                    <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
                                        Showing {{
                                            (this.currentPage - 1) * this.perPage + 1 }}
                                        to {{ parseInt(((this.currentPage - 1) * this.perPage + this.perPage)) }} of {{
                                            this.totalItems }}
                                        entries</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                        <ul class="pagination">
                                            <li class="paginate_button page-item previous disabled" id="dataTable_previous"
                                                :class="{ disabled: currentPage <= 1 }"><a @click.prevent="previousPage"
                                                    aria-controls="dataTable" data-dt-idx="0" tabindex="0"
                                                    class="page-link">Previous</a></li>
                                            <template v-if="totalPages <= 5">
                                                <li class="paginate_button page-item" v-for="page in pages" :key="page"
                                                    :class="{ active: page === currentPage }"><a aria-controls="dataTable"
                                                        data-dt-idx="2" tabindex="0" class="page-link"
                                                        @click.prevent="gotoPage(page)">{{ page }}</a></li>
                                            </template>
                                            <template v-else>
                                                <li class="paginate_button page-item" v-for="page in 3" :key="page"
                                                    :class="{ active: page === currentPage }"><a aria-controls="dataTable"
                                                        data-dt-idx="2" tabindex="0" class="page-link"
                                                        @click.prevent="gotoPage(page)">{{ page }}</a></li>
                                                <li class="paginate_button page-item disabled"><span>...</span></li>
                                                <li class="paginate_button page-item"
                                                    v-for="page in [totalPages - 1, totalPages]" :key="page"
                                                    :class="{ active: page === currentPage }"><a aria-controls="dataTable"
                                                        data-dt-idx="2" tabindex="0" class="page-link"
                                                        @click.prevent="gotoPage(page)">{{ page }}</a></li>
                                            </template>
                                            <li class="paginate_button page-item next" id="dataTable_next"
                                                :class="{ disabled: currentPage >= totalPages }"><a href="#"
                                                    aria-controls="dataTable" data-dt-idx="7" tabindex="0" class="page-link"
                                                    @click.prevent="nextPage">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- New Package Form -->
            <div class="card shadow mb-4 col-3">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Add New Package</h6>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="packageName">Package Name:</label>
                            <input type="text" class="form-control" id="packageName" v-model="newPackage.packageName"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="speed">Speed (Mbps):</label>
                            <input type="number" class="form-control" id="speed" v-model="newPackage.speed" required>
                        </div>
                        <div class="form-group">
                            <label for="dataLimit">Data Limit (G):</label>
                            <input type="number" class="form-control" id="dataLimit" v-model="newPackage.dataLimit"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="price">Price (K vnd/month):</label>
                            <input type="number" class="form-control" id="price" v-model="newPackage.price" required>
                        </div>
                        <button style="margin-right: 5px;" type="submit" class="btn btn-primary" @click.prevent="addNewInternetPackage">Save</button>
                        <button type="submit" class="btn btn-secondary" @click.prevent="resetNewPackage">Reset</button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { getAllPackages, togglePackageStatus, addNewInternetPackage } from "../../utils/internetPackage-api.js";
export default {
    data() {
        return {
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            totalPages: 0,
            tableData: [],
            selectedRow: {
                id: '',
                packageName: '',
                speed: '',
                dataLimit: '',
                price: '',
                createdDate: '',
                deleted: ''
            },
            showFormSearch: false,
            isEditing: false,
            isLoading: false,
            newPackage: {
                packageName: '',
                speed: '',
                dataLimit: '',
                price: ''
            }
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
            getAllPackages(this.currentPage - 1, this.perPage).then((response) => {
                this.tableData = response.content;
                this.totalItems = response.totalElements;
                this.totalPages = response.totalPages;
            })
        },
        togglePackageStatus() {
            togglePackageStatus(this.selectedRow.id).then((response) => {
                if (response) {
                    alert("Success")
                } else {
                    alert("Failed")
                }
            })
            this.getAllPackages();
        },
        async addNewInternetPackage() {
            if (this.newPackage.packageName === '') {
                alert("Fill package name")
                return
            }
            if (this.newPackage.dataLimit === '') {
                alert("Fill data Limit")
                return
            }
            if (this.newPackage.speed === '') {
                alert("Fill speed ")
                return
            }
            if (this.newPackage.price === '') {
                alert("Fill package price")
                return
            }
            try {
                const response = await addNewInternetPackage(this.newPackage);
                if (response === "SUCCESS") {
                    alert("Added successfully")
                    this.getAllPackages();
                    this.resetNewPackage();
                } else {
                    alert("Add failed: " + response)
                }
            } catch (error) {
                console.error(error);
                alert("Error: " + error)
            }
        },
        resetNewPackage () {
            this.newPackage.dataLimit = '',
            this.newPackage.packageName = '',
            this.newPackage.speed = '',
            this.newPackage.price = ''
        },
        gotoPage(page) {
            this.currentPage = page;
            this.getAllPackages();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getAllPackages();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getAllPackages();
            }
        }
    },
    mounted() {
        // this.searchBy();
        this.getAllPackages();
    }
}
</script>

<style>
.col-sm-12.col-md-7,
.dataTables_filter {
    display: flex;
    flex-direction: row-reverse;
}

.dataTables_filter {
    display: flex;
    flex-direction: row-reverse;
}

div.dataTables_length select {
    width: auto;
    display: inline-block;
}

div.dataTables_length label {
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
}

div.dataTables_filter {
    text-align: right;
}

div.dataTables_filter label {
    font-weight: normal;
    white-space: nowrap;
    text-align: left;
}
</style>