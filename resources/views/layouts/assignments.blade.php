@if (auth()->check())
<div class="col-md-4 push-md-8" id="assignments">
    <div class="card">
        <div class="card-header">
            Assignments
        </div>
        <ul class="list-group list-group-flush">
            <li v-cloak v-for="assignment in assignments" class="list-group-item">@{{ assignment.name }}</li>
            <li v-cloak v-if="status === 0" class="list-group-item">No Assignment</li>
        </ul>
    </div>
</div>
@endif