<div class="form-group">
    @if ($errors->has('code'))
        <div class="alert alert-danger">
            {{ $errors->first('code') }}
        </div>
    @endif
</div>