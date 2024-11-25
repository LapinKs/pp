<?php
require_once(__DIR__ . '/../../../../config.php'); // Убедитесь, что путь к config.php правильный

$action = required_param('action', PARAM_ALPHA);

if ($action === 'check_context') {
    $questionType = optional_param('questionType', '', PARAM_ALPHA);
    $isTextInsertionContext = ($questionType === 'qtype_ddwots');
    echo json_encode(['isTextInsertionContext' => $isTextInsertionContext]);
    exit;
}