<footer class="invisible text-muted w-50 footer-lg">
    <div class="row">
        <div class="col-4"></div>

        <div class="col-4">
            <div>Powered by <a href="http://laravel.com" target="_blank">Laravel 5.4</a> & <a
                        href="http://getbootstrap.com" target="_blank">Bootstrap 4</a></div>
            <a href="http://github.com/zyd2001/school-yida-rocks" target="_blank">Github</a> &
            <a href="http://git.oschina.net/zyd2001/school-yida-rocks" target="_blank">Git@OSChina</a>
        </div>
        @if(auth()->check())
            <div class="col-2"></div>
            <div class="col-2">
                <div class="dropup">
                    <a class="dropdown-toggle text-primary" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        Language
                    </a>
                </div>
            </div>
        @endif
    </div>
</footer>

<footer class="invisible text-muted hidden w-50 footer-sm">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="dropup mx-auto">
                    <a class="dropdown-toggle text-primary" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        About
                    </a>
                </div>
            </div>
            @if(auth()->check())
                <div class="col">
                    <div class="dropup mx-auto">
                        <a class="dropdown-toggle text-primary" data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false">
                            Language
                        </a>
                    </div>
                </div>
            @endif
        </div>
    </div>
</footer>

<footer class="fixed-bottom text-muted footer-lg">
    <div class="row">
        <div class="col-4"></div>

        <div class="col-4">
            <div>Powered by <a href="http://laravel.com" target="_blank">Laravel 5.4</a> & <a
                        href="http://getbootstrap.com" target="_blank">Bootstrap 4</a></div>
            <a href="http://github.com/zyd2001/school-yida-rocks" target="_blank">Github</a> &
            <a href="http://git.oschina.net/zyd2001/school-yida-rocks" target="_blank">Git@OSChina</a>
        </div>
        @if(auth()->check())
            <div class="col-2"></div>
            <div class="col-2">
                <div class="dropup">
                    <a class="dropdown-toggle text-primary" id="language" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        Language
                    </a>
                    <div class="dropdown-menu" aria-labelledby="language">
                        <a class="dropdown-item" href="/setLocale?locale=zh">中文</a>
                        <a class="dropdown-item" href="/setLocale?locale=en">English</a>
                    </div>
                </div>
            </div>
        @endif
    </div>
</footer>

<footer class="fixed-bottom text-muted hidden footer-sm">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="dropup mx-auto">
                    <a class="dropdown-toggle text-primary" id="about" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        About
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="about">
                        <span class="dropdown-item">Powered by</span>
                        <a class="dropdown-item text-primary" href="http://laravel.com" target="_blank">Laravel5.4</a>
                        <a class="dropdown-item text-primary" href="http://getbootstrap.com"
                           target="_blank">Bootstrap4</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-primary" href="http://github.com/zyd2001/school-yida-rocks"
                           target="_blank">Github</a>
                        <a class="dropdown-item text-primary" href="http://git.oschina.net/zyd2001/school-yida-rocks"
                           target="_blank">Git@OSChina</a>
                    </div>
                </div>
            </div>
            @if(auth()->check())
                <div class="col">
                    <div class="dropup mx-auto">
                        <a class="dropdown-toggle text-primary" id="language" data-toggle="dropdown"
                           aria-haspopup="true"
                           aria-expanded="false">
                            Language
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="language">
                            <a class="dropdown-item" href="/setLocale?locale=zh">中文</a>
                            <a class="dropdown-item" href="/setLocale?locale=en">English</a>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>
</footer>