@if (session()->has('err'))
    <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="alert alert-danger">
                {{ session('err') }}
            </div>
        </div>
    </div>
@elseif (session()->has('msg'))
    <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="alert alert-info">
                {{ session('msg') }}
            </div>
        </div>
    </div>
@endif