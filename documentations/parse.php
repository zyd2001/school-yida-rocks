<?php
/**
 * Created by PhpStorm.
 * User: zyd
 * Date: 17-7-15
 * Time: 下午1:59
 */
// require_once('vendor/autoload.php');
require_once('Parsedown.php');
$files = scandir('.');
foreach ($files as $file) {
    if (substr($file, -2) == 'md') {
        $markdown = file_get_contents($file);
        $output = Parsedown::instance()->text($markdown);
        $output = '<meta charset="UTF-8">' . '<link rel="stylesheet" href="http://orjf65xeb.bkt.clouddn.com/markdown7.css">' . $output;
        file_put_contents(substr($file, 0, strlen($file) - 3) . '.html', $output);
    }
}
