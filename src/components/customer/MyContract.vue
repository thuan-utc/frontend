<template>
    <div class="container-fluid">

        <!-- Page Heading -->
        <h1 class="h3 mb-2 text-gray-800">Contract history</h1>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">List contracts</h6>
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
                                <table class="table table-bordered table-hover table-striped" id="dataTable" width="100%"
                                    cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Package Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Created Date</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="contract in tableData  " :key="contract.id">
                                            <td>{{ contract.customerName }}</td>
                                            <td>{{ contract.packageName }}</td>
                                            <td>{{ new Date(contract.startDate).toISOString().slice(0, 10) }}</td>
                                            <td>{{ new Date(contract.endDate).toISOString().slice(0, 10) }}</td>
                                            <td>{{ new Date(contract.createdDate).toISOString().slice(0, 10) }}</td>
                                            <td>{{ contract.price }}K vnd</td>
                                            <td>{{ isExpired(contract.endDate) ? 'Expired' : 'Active' }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-5">
                                <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing {{
                                    (parseInt(this.currentPage) - 1) * parseInt(this.perPage) + 1 }}
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
                                            <li class="paginate_button page-item" v-for="  page   in   pages  " :key="page"
                                                :class="{ active: page === currentPage }"><a aria-controls="dataTable"
                                                    data-dt-idx="2" tabindex="0" class="page-link"
                                                    @click.prevent="gotoPage(page)">{{ page }}</a></li>
                                        </template>
                                        <template v-else>
                                            <li class="paginate_button page-item" v-for="  page   in   3  " :key="page"
                                                :class="{ active: page === currentPage }"><a aria-controls="dataTable"
                                                    data-dt-idx="2" tabindex="0" class="page-link"
                                                    @click.prevent="gotoPage(page)">{{ page }}</a></li>
                                            <li class="paginate_button page-item disabled"><span>...</span></li>
                                            <li class="paginate_button page-item"
                                                v-for="  page   in   [totalPages - 1, totalPages]  " :key="page"
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
        <div class="row">
            <div v-if="showStatusMessage" class="card mb-4 py-3 status-message"
                :class="statusMessage === 'SUCCESS' ? 'border-bottom-success' : 'border-bottom-danger'">
                <div class="card-body">
                    {{ statusMessage }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getContractByCustomer } from '../../utils/contract-api'
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
        getCustomerContract() {
            getContractByCustomer(this.currentPage - 1, this.perPage, this.userName).then((response) => {
                this.tableData = response;
                // this.totalItems = response.content.size;
                // this.totalPages = response.content.size;
            })
        },
        async cancelContract() {
            // await sendRemindEmail(this.selectedRow.customerId, this.selectedRow.id).then((response) => {
            //     this.statusMessage = response
            //     this.showStatusMessage = true
            //     setTimeout(() => this.isHidden = false, 2000);
            //     this.showStatusMessage = false
            //     this.statusMessage = ''
            //     alert("SENT " + response)
            // })
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
        isExpired(createdDate) {
            const now = new Date();
            const created = new Date(createdDate);
            return now > created;
        }
    },
    mounted() {
        this.getCustomerContract();
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

.status-message {
    position: absolute;
    bottom: 10px;
    right: 0px;
    width: 30%;
    animation-name: fadeOut;
    animation-duration: 2s;

    z-index: 9999;
    display: flex;
    flex-direction: row-reverse;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>