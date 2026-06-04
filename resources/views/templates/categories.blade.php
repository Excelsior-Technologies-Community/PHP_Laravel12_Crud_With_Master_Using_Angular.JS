<div ng-init="loadCategories()">
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-tags"></span> Category Management
                    </h3>
                </div>
                <div class="panel-body">
                    <button class="btn btn-success" ng-click="openModal('add')">
                        <span class="glyphicon glyphicon-plus"></span> Create Category
                    </button>
                </div>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="active">
                            <th width="60">ID</th>
                            <th>Category Name</th>
                            <th width="100">Products</th>
                            <th width="150">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="cat in categories">
                            <td>${ cat.id }</td>
                            <td><strong>${ cat.name }</strong></td>
                            <td class="text-center">
                                <span class="badge">${ cat.products_count || 0 }</span>
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm" ng-click="openModal('edit', cat)">
                                    <span class="glyphicon glyphicon-edit"></span> Edit
                                </button>
                                <button class="btn btn-danger btn-sm" ng-click="remove(cat.id, $index)">
                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                </button>
                            </td>
                        </tr>
                        <tr ng-if="categories.length == 0">
                            <td colspan="4" class="text-center text-muted">
                                <span class="glyphicon glyphicon-folder-open"></span> No Categories Found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Category Modal -->
    <div class="modal fade" id="categoryModal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #337ab7; color: white;">
                    <button type="button" class="close" data-dismiss="modal" style="color: white;">&times;</button>
                    <h4 class="modal-title">
                        <span class="glyphicon glyphicon-tag"></span> ${ modalTitle }
                    </h4>
                </div>
                <div class="modal-body">
                    <form ng-submit="form.id ? update() : save()">
                        <div class="form-group">
                            <label>Category Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="form.name" 
                                   placeholder="Enter category name" required autofocus>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                <span class="glyphicon glyphicon-remove"></span> Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" ng-disabled="loading">
                                <span class="glyphicon glyphicon-save"></span> 
                                ${ form.id ? "Update" : "Save" }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>