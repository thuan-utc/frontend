<template>
    <div class="container-fluid">

        <!-- Page Heading -->
        <h1 class="h3 mb-2 text-gray-800">Tables</h1>
        
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">List Bill Paid</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped" id="dataTable" width="100%"
                        cellspacing="0">
                        <thead>
                            <tr>
                                <th>Customer Id</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <th>Customer Id</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Created Date</th>
                            <th>Total</th>
                        </tfoot>
                        <tbody>
                            <tr v-for="bill in tableData" :key="bill.id" @click="this.selectedRow = bill">
                                <td>{{ bill.customerId }}</td>
                                <td>{{ bill.customerName }}</td>
                                <td>{{ bill.amount }}</td>
                                <td>{{ bill.dueDate }}</td>
                                <td>{{ bill.BillStatus }}</td>
                                <td>{{ bill.createdDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="dataTable_previous"><a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="dataTable_next"><a href="#" aria-controls="dataTable" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div>

    </div>
</template>

<script>
import { getPaidBills } from "../../utils/listPaidBills.js";
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
                phoneNumber: '',
                email: '',
                address: ''
            },
            showFormSearch: false,
            isEditing: false,
            isLoading: false,
            isfirstSearchWithCriteria: true
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
        getPaidBillList () {
            getPaidBills().then((response) => {
                this.tableData = response
            })
        },
        gotoPage(page) {
            this.currentPage = page;
            this.searchBy();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.searchBy();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.searchBy();
            }
        },
    },
    mounted() {
        // this.searchBy();
        this.getPaidBillList();
    }
}
</script>