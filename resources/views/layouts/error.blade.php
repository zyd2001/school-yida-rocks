@if ($errors->has($type))
<div class="alert alert-danger">
    {{ $errors->first($type) }}
</div>
@endif