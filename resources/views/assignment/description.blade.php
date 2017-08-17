<div class="row">
	<!-- Grading information -->
	<div class="col-md-4 push-md-8" id="description_grade">
		<div class="card">
			<!-- Add grades -->
			<p class="card-text">Grade: </p>
			<button href="#" class="btn btn-info">Contact Instructor</button>
		</div>
	</div>
	<div class="col-md-8 pull-md-4" id="description_content">
		<div class="card">
			<div class="card-header">
				<div class="row">
					<div class="col-md-4 text-center">Assignment Title: </div>
					<div class="col-md-8 text-left">{{ $assignment.name }}</div>
				</div>
			</div>
			<div class="card-title">
				<div class="row">
					<h5 class="col-md-4 text-center">From Course: </h5>
					<!-- How to get course from course id -->
					<h4 class="col-md-8 text-left">{{ $assignment.course_id }}</h4>
				</div>
			</div>
			<div class="card-text">
			</div>
			<button id="get_content" 
			class="btn btn-primary" 
			href="" 
			onclick="$('.assignment_content').slideToggle(function(){
						$('#get_content').html($('.assignment_content').is(':visible')?'Complete This Assignment':'Complete This Assignment');
					});
					$('.assignment_description').slideToggle(function(){
						$('#get_content').html($('.assignment_description').is(':visible')?'Complete This Assignment':'Complete This Assignment');
					}); "
			>Complete This Assignment</button>
	<!-- About to add if-statements for warnings on assignment due time -->
			<div class="card-footer alert-warning">
				<div class="row">
					<p>Due Time: </p>
					<h5>{{ $assignment.dueTime[0] }}</h5>
				</div>
			</div>
		</div>
	</div>
</div>