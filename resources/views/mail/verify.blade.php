@component('mail::message')
# {{ $name }}

Your verify code is

@component('mail::panel')
{{ $verifyCode }}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
