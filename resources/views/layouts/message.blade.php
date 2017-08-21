<div class="modal fade messageModal" id="message_danger" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="alert alert-danger">
            @if (session()->has('err'))
                {{ session('err') }}
            @endif
        </div>
    </div>
</div>
<div class="modal fade messageModal" id="message_info" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="alert alert-info">
            @if (session()->has('msg'))
                {{ session('msg') }}
            @endif
        </div>
    </div>
</div>
