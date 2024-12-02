import {component as buttonName} from 'tiny_custombutton/common';
import {addMenubarItem, addToolbarButton, addToolbarSection} from 'editor_tiny/utils';

/**
 * Проверяет, является ли текущий контекст "вставкой в текст".
 * @returns {boolean} Возвращает true, если это нужный контекст.
 */
// const isTextInsertionContext = async () => {
//     try {
//         const response = await fetch('/tiny/plugins/custombutton/ajax.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ action: 'check_context' })
//         });
//         const data = await response.json();
//         return data.isTextInsertionContext;
//     } catch (error) {
//         console.error('Error checking context:', error);
//         return false;
//     }
// };

const configureToolbar = (toolbar) => {
    addToolbarSection(toolbar, 'advanced', 'lists', true);
    return addToolbarButton(toolbar, 'advanced', buttonName);
};

export const configure = (instanceConfig) => {
    // if (!isTextInsertionContext()) {
    //     return instanceConfig; // Если не тот контекст, возвращаем конфигурацию без изменений.
    // }

    return {
        menu: addMenubarItem(instanceConfig.menu, 'insert', buttonName),
        toolbar: configureToolbar(instanceConfig.toolbar),
    };
};
