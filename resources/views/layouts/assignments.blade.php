@if (auth()->check())
    <div class="col-md-4 order-md-2" id="assignments">
        <div class="card">
            <div class="card-header">
                {{ __('message.upcoming') }}
                <span class="badge badge-danger badge-pill" id="tasklist"></span>
            </div>
            <ul class="list-group list-group-flush">
                <a v-cloak v-for="assignment in assignments" class="list-group-item" data-container="body"
                   data-toggle="popover" data-placement="left" data-html="true"
                   v-bind:data-content="assignment.hoverMessage"
                   v-bind:href="'/assignments/' + assignment.id"
                   v-on:mouseenter="show" v-on:mouseleave="hide"
                   v-if="assignment.dueTime['upcoming'] === 1">
                    <div class="row"><div class="col my-auto">@{{ assignment.name }}</div>
                        <span style="font-size: 0.8rem" class="text-muted ml-auto">due:&nbsp;</span>
                        <span style="font-size: 0.65rem" class="text-muted order-2">@{{ assignment.dueTime[0] }}<br>&nbsp;@{{ assignment.dueTime[1] }}</span>
                    </div>
                </a>
                <li v-cloak v-if="status === 0" class="list-group-item">No Assignment</li>
            </ul>
        </div>
    </div>
@endif