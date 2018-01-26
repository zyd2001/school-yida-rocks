<div class="row">
    <!-- Grading information -->
    <div class="col-md-4 push-md-8 mb-3" id="description_grade">
        <div class="card">
            <!-- Add grades -->
            <div class="card-body">
                <p id="attempt" class="hidden">{{ $grade->attempt }}</p>
                <p>{{ __('message.youHave') }}&nbsp;{{ $setting->attempt - $grade->attempt }}&nbsp;{{ __('message.attemptsLeft') }}.</p>
                @if (gettype($grade->percent) != 'NULL')
                    <p class="card-text">{{ __('message.grade') }}: {{ $grade->percent . '%' }}</p>
                    <button id="get_detail" class="btn btn-info"
                            onclick="$('#assignment_grade').slideToggle();$('#assignment_description').slideToggle()">
                        View Detail
                    </button>
                @else
                    <p class="card-text">{{ __('message.grade') }}: N/A</p>
                @endif
                <button href="#" class="btn btn-info">{{ __('message.contact') }}{{ __('message.engspace') }}{{ __('message.instructor') }}</button>
            </div>
        </div>
    </div>
    <div class="col-md-8 pull-md-4 mb-3" id="description_content">
        <div class="card">
            <div class="card-header text-center">
                <h6>Assignment Title:&nbsp;{{ $assignment->name }}</h6>
            </div>
            <p class="ml-3">From Course:&nbsp;{{ $assignment->course->name }}</p>
            <button id="get_content"
                    class="btn btn-primary"
                    onclick="$('#assignment_content').slideToggle();
					$('#assignment_description').slideToggle();"
                    v-bind:disabled="!isOpen" v-cloak>@{{ buttonText }}
            </button>
            @php
                use Carbon\Carbon;
                $due = new Carbon($assignment->dueTime);
                $diff = $due->diffForHumans(Carbon::now(), false);
                $difference = $due->diffInMinutes(Carbon::now(), false);
            @endphp
            @if ($difference < 0)
            <div class="card-footer alert-success mt-1">
                <div class="row ml-3">
                    <h5>Due Time:&nbsp;</h5>
                    <p>{{ $assignment->dueTime }} ({{ $diff }})</p>
                </div>
            </div>
            @else
            <div class="card-footer alert-danger mt-1">
                <div class="row ml-3">
                    <h5>{{ __('message.dueTimeExceed') }}:&nbsp;</h5>
                    <p>{{ $assignment->dueTime }} ({{ $diff }})</p>
                </div>
            </div>
            {{--<script type="text/javascript">--}}
                {{--function hideattempt(){--}}
                    {{--document.getElementById('get_content').style.display='none';--}}
                    {{--document.getElementById('assignment_content').innerHTML = "";--}}
                {{--}--}}
                {{--hideattempt();--}}
            {{--</script>--}}
            @endif
        </div>
    </div>
</div>