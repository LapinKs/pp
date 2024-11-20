defined('MOODLE_INTERNAL') || die();

$settings->add(new admin_setting_configtext('editor_tiny/custombutton',
    get_string('custombutton', 'editor_tiny'),
    get_string('custombutton_desc', 'editor_tiny'),
    'custombutton', PARAM_TEXT));
