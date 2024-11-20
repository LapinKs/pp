import {component as buttonName} from 'tiny_custombutton/common';
import {
    addMenubarItem,
    addToolbarButton,
    addToolbarSection,
} from 'editor_tiny/utils';

const configureToolbar = (toolbar) => {
    addToolbarSection(toolbar, 'advanced', 'lists', true);
    return addToolbarButton(toolbar, 'advanced', buttonName);
};

export const configure = (instanceConfig) => {
    return {
        menu: addMenubarItem(instanceConfig.menu, 'insert', buttonName),
        toolbar: configureToolbar(instanceConfig.toolbar),
    };
};
