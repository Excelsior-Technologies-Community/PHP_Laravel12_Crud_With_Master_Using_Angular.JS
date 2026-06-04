<div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-shopping-cart"></span> Product Management
                    </h3>
                </div>
                <div class="panel-body">
                    <button class="btn btn-success" ng-click="openModal('add')">
                        <span class="glyphicon glyphicon-plus"></span> Create Product
                    </button>
                </div>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="active">
                            <th width="50">ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Sizes</th>
                            <th width="150">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="p in products">
                            <td>{{ '{{ p.id }}' }}</td>
                            <td><strong>{{ '{{ p.name }}' }}</strong></td>
                            <td>
                                <span class="label label-primary">{{ '{{ p.category.name }}' }}</span>
                            </td>
                            <td>
                                <span class="label label-success">${{ '{{ p.price }}' }}</span>
                            </td>
                            <td>
                                <span ng-repeat="size in p.sizes" class="label label-info" style="margin-right: 3px;">
                                    {{ '{{ size.name }}' }}
                                </span>
                                <span ng-if="p.sizes.length == 0" class="text-muted">No sizes</span>
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm" ng-click="openModal('edit', p)">
                                    <span class="glyphicon glyphicon-edit"></span> Edit
                                </button>
                                <button class="btn btn-danger btn-sm" ng-click="remove(p.id, $index)">
                                    <span class="glyphicon glyphicon-trash"></span> Delete
                                </button>
                            </td>
                        </tr>
                        <tr ng-if="products.length == 0">
                            <td colspan="6" class="text-center text-muted">
                                <span class="glyphicon glyphicon-folder-open"></span> No Products Found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Product Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white" style="background-color: #5cb85c; color: white;">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <span class="glyphicon glyphicon-shopping-cart"></span> {{ '{{ modalTitle }}' }}
                    </h4>
                </div>
                <div class="modal-body">
                    <form ng-submit="form.id ? update() : save()">
                        <div class="form-group">
                            <label>Category <span class="text-danger">*</span></label>
                            <select class="form-control" ng-model="form.category_id" required>
                                <option value="">-- Select Category --</option>
                                <option ng-repeat="c in categories" value="{{ '{{ c.id }}' }}">
                                    {{ '{{ c.name }}' }}
                                </option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Product Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" ng-model="form.name" 
                                   placeholder="Enter product name" required autofocus>
                        </div>
                        
                        <div class="form-group">
                            <label>Price <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-addon">$</span>
                                <input type="number" step="0.01" class="form-control" ng-model="form.price" 
                                       placeholder="Enter price" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Sizes (Optional)</label>
                            <div class="checkbox-group">
                                <div class="checkbox" ng-repeat="size in sizes">
                                    <label>
                                        <input type="checkbox" ng-checked="isSizeSelected(size.id)" 
                                               ng-click="toggleSize(size.id)">
                                        <strong>{{ '{{ size.name }}' }}</strong> ({{ '{{ size.code }}' }})
                                    </label>
                                </div>
                                <div ng-if="sizes.length == 0" class="text-muted text-center">
                                    No sizes available. <a href="#/sizes">Create sizes first</a>
                                </div>
                            </div>
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