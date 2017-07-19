@if (auth()->check())
<div class="col-md-4 push-md-8" id="assignments">
    <div class="card">
        <div class="card-header">
            Assignments
        </div>
        <ul v-html="assignments" class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
        </ul>
    </div>
</div>
@endif