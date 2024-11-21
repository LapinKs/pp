defined('MOODLE_INTERNAL') || die();

$settings->add(new admin_setting_configtextarea('editor_tiny/custombutton_options',
    get_string('custombutton_options', 'editor_tiny'),
    get_string('custombutton_options_desc', 'editor_tiny'),
    "Вариант 1\nВариант 2\nВариант 3", PARAM_RAW));

