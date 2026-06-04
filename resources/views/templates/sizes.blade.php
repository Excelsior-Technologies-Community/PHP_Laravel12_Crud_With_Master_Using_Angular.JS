<div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-resize-horizontal"></span> Size Management
                    </h3>
                </div>
                <div class="panel-body">
                    <button class="btn btn-success" ng-click="openModal('add')">
                        <span class="glyphicon glyphicon-plus"></span> Create Size
                    </button>
                </div>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="active">
                            <th width="60">ID</th>
                            <th>Size Name</th>
                            <th>Code</th>
                            <th width="150">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="size in sizes">
                            <td>{{ '{{ size.id }}' }}</td>
                            <td><strong>{{ '{{ size.name }}' }}</strong></td>
                            <td><span class="label label-info">{{ '{{ size.code }}' }}</span></td>
                            <td>
                                <button class="btn btn-warning btn-sm" ng-click="openModal('edit', size)">
                                    <span class="glyphicon glyphicon-edit"></span> Edit
                                </button>
                                <button class="btn btn-danger btn-sm" ng-click="remove(size.id, $index)">
                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                </button>
                            </td>
                        </tr>
                        <tr ng-if="sizes.length == 0">
                            <td colspan="4" class="text-center text-muted">
                                <span class="glyphicon glyphicon-folder-open"></span> No Sizes Found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Size Modal -->
    <div class="modal fade" id="sizeModal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-info text-white" style="background-color: #5bc0de; color: white;">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <span class="glyphicon glyphicon-resize-horizontal"></span> {{ '{{ modalTitle }}' }}
                    </h4>
                </div>
                <div class="modal-body">
                    <form ng-submit="form.id ? update() : save()">
                        <div class="form-group">
                            <label>Size Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="form.name" 
                                   placeholder="e.g., Small, Medium, Large" required autofocus>
                        </div>
                        <div class="form-group">
                            <label>Size Code <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="form.code" 
                                   placeholder="e.g., S, M, L, XL" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                <span class="glyphicon glyphicon-remove"></span> Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" ng-disabled="loading">
                                <span class="glyphicon glyphicon-save"></span> 
                                {{ '{{ form.id ? "Update" : "Save" }}' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>