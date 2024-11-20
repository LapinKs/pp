import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from 'tiny_custombutton/common';

const customOptionName = getPluginOptionName(pluginName, 'customoption');
const customFilterName = getPluginOptionName(pluginName, 'customfilter');

export const register = (editor) => {
    const registerOption = editor.options.register;

    registerOption(customOptionName, {
        processor: 'array',
        "default": [],
    });

    registerOption(customFilterName, {
        processor: 'boolean',
        "default": false,
    });
};

export const getCustomOptions = (editor) => editor.options.get(customOptionName);
export const isCustomFilterActive = (editor) => editor.options.get(customFilterName);
