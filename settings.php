<?php
defined('MOODLE_INTERNAL') || die();

$settings->add(new admin_setting_configtextarea(
    'editor_tiny/custombutton_options',
    get_string('custombutton_options', 'editor_tiny'), // Название настройки.
    get_string('custombutton_options_desc', 'editor_tiny'), // Описание настройки.
    "Вариант 1\nВариант 2\nВариант 3" // Значение по умолчанию.
));
