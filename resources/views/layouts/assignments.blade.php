@if (auth()->check())
    <div class="col-md-4 push-md-8" id="assignments">
        <div class="card">
            <div class="card-header">
                Assignments
            </div>
            <ul class="list-group list-group-flush">
                <a v-cloak v-for="assignment in assignments" class="list-group-item" data-container="body"
                   data-toggle="popover" data-placement="left" data-html="true"
                   v-bind:data-content="assignment.hoverMessage"
                   v-bind:href="'/assignments/' + assignment.id"
                   v-on:mouseenter="show" v-on:mouseleave="hide">@{{ assignment.name }}
                    <span style="font-size: 0.8rem" class="text-muted ml-auto">due:&nbsp;</span>
                    <span style="font-size: 0.65rem" class="text-muted">@{{ assignment.dueTime[0] }}<br>&nbsp;@{{ assignment.dueTime[1] }}</span></a>
                <li v-cloak v-if="status === 0" class="list-group-item">No Assignment</li>
            </ul>
        </div>
    </div>
@endif