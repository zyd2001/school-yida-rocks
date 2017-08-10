@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="card mx-auto">
            <div class="card-header">Verify</div>
            <div class="card-block">
                <form action="/verify" class="form-horizontal" method="post">
                    {{ csrf_field() }}
                    <input type="text" class="form-controller" name="code">
                    <input type="submit" class="form-controller btn btn-primary" value="验证">
                </form>
                <div class="row">
                    <a type="submit" class="mx-auto" href="#" id="re">regenerate verify code</a>
                </div>
            </div>
        </div>
    </div>
@endsection
<div class="modal fade" id="message" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="alert alert-info text-center">
        </div>
    </div>
</div>
@section('script')
    @parent
    <script>
        $($('#re').on('click', function (event) {
            event.preventDefault();
            axios.post('/verify', {
                    _token: document.getElementsByTagName('meta')['csrf-token'].content,
                    re: true,
            }).then(function (res) {
                $('.alert-info').html(res.data.msg);
                $('#message').modal('show');
                window.setTimeout("$('#message').modal('hide')", 2000);
            }).catch(function (err) {
                console.log(err)
            })
        }));
    </script>
@endsection
