<div class="card mb-3">
	<div class="card-header">{{ __('message.upcoming') }}
		<span class="badge badge-danger badge-pill" id="tasklist"></span>
	</div>
	<ul class="list-group list-group-flush">
	    <a v-cloak v-for="assignment in assignments" class="list-group-item"
	       v-bind:href="'/assignments/' + assignment.id" v-if="assignment.dueTime['upcoming'] === 1">
			<div class="row">
				<div class="col my-auto">@{{ assignment.name }}</div>       
				<span class="text-muted ml-auto">{{ __('message.due') }}:&nbsp;</span>
				<span class="text-muted order-2">@{{ assignment.dueTime[0] }}&nbsp;@{{ assignment.dueTime[1] }}</span>
			</div>
	    </a>
	    <li v-cloak v-if="status === 0" class="list-group-item">{{ __('message.no') }} {{ __('message.assignments') }}</li>
	</ul>
</div>
<div class="card mt-3">
	<div class="card-header">{{ __('message.history') }}
	</div>
	<ul class="list-group list-group-flush">
	    <a v-cloak v-for="assignment in assignments" class="list-group-item"
	       v-bind:href="'/assignments/' + assignment.id" v-if="assignment.dueTime['upcoming'] === 0">
			<div class="row">
				<div class="col my-auto">@{{ assignment.name }}</div>       
				<span class="text-muted ml-auto">{{ __('message.due') }}:&nbsp;</span>
				<span class="text-muted order-2">@{{ assignment.dueTime[0] }}&nbsp;@{{ assignment.dueTime[1] }}</span>
			</div>
	    </a>
	    <li v-cloak v-if="status === 0" class="list-group-item">{{ __('message.no') }} {{ __('message.assignments') }}</li>
	</ul>
</div>