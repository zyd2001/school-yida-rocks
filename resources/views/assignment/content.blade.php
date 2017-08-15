<div class="row">
	<div class="col-md-8" id="content">
		<div class="card">
			<div class="card-header">
				<div class="col-md-4">Assignment Title: </div>
				<div class="col-md-4">@{{ assignment.name }}</div>
			</div>
			<div class="card-title">
				<div class="text-center">
					<div class="row-center">
						<h5>From Course: </h5>
						<!-- How to get course from course id -->
						<h4>@{{ assignment.course_id }}</h4>
					</div>
				</div>
			</div>
			<div class="card-text">
				<p>@{{ assignment.content }}</p>
			</div>
			<button href="#" class="btn btn-primary">Complete This Assignment</button>
	<!-- About to add if-statements for warnings on assignment due time -->
			<div class="card-footer alert-warning">
				<div class="row">
					<p>Due Time: </p>
					<h5>@{{ assignment.dueTime[0] }}</h5>
				</div>
			</div>
		</div>
	</div>
	<!-- Grading information -->
	<div class="col-md-4" id="grading">
		<div class="card">
			<!-- Add grades -->
			<p class="card-text">Grade: </p>
			<button href="#" class="btn btn-info">Contact Instructor</button>
		</div>
	</div>
</div>