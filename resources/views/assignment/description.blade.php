<div class="row">
    <!-- Grading information -->
    <div class="col-md-4 push-md-8" id="description_grade">
        <div class="card">
            <!-- Add grades -->
            <div class="card-body">
                <p id="attempt" class="hidden">{{ $grade->attempt }}</p>
                <p>You have {{ $setting->attempt - $grade->attempt }} attempt(s) left</p>
                @if ($grade->percent)
                    <p class="card-text">Grade: {{ $grade->percent . '%' }}</p>
                    <button class="btn btn-info"
                            onclick="$('#assignment_grade').slideToggle();$('#assignment_description').slideToggle()">
                        View Detail
                    </button>
                @else
                    <p class="card-text">Grade: N/A</p>
                @endif
                <button href="#" class="btn btn-info">Contact Instructor</button>
            </div>
        </div>
    </div>
    <div class="col-md-8 pull-md-4" id="description_content">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-4 text-center">Assignment Title:</div>
                    <div class="col-md-8 text-left">{{ $assignment->name }}</div>
                </div>
            </div>
            <div class="card-title">
                <div class="row">
                    <h5 class="col-md-4 text-center">From Course: </h5>
                    <h4 class="col-md-8 text-left">{{ $assignment->course_id }}</h4>
                </div>
            </div>
            <button id="get_content"
                    class="btn btn-primary"
                    onclick="$('#assignment_content').slideToggle();
					$('#assignment_description').slideToggle();"
                    v-bind:disabled="!isOpen" v-cloak>@{{ buttonText }}
            </button>
            @php
                use Carbon\Carbon;
                $due = new Carbon($assignment->dueTime);
                $timeLeft = $due->diffForHumans();
                $diff = Carbon::now()->diffInDays($due, false);
            @endphp
            @if ($diff > 0)
            <div class="card-footer alert-warning">
                <div class="row">
                    <h5>Due Time: </h5>
                    <p>{{ $assignment->dueTime }} ({{ $diff }})</p>
                </div>
            </div>
            @else
            <div class="card-footer alert-danger">
                <div class="row">
                    <h5>You have exceeded the Due Time: </h5>
                    <p>{{ $due }} ({{ $timeLeft }})</p>
                </div>
            </div>
            <script type="text/javascript">
                function hideattempt(){
                    document.getElementById('get_content').style.display='none';
                    document.getElementById('assignment_content').innerHTML = "";
                }
                hideattempt();
            </script>
            @endif
        </div>
    </div>
</div>