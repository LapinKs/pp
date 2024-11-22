import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from 'tiny_custombutton/common';

const customOptionName = getPluginOptionName(pluginName, 'customoptions');
const customFilterName = getPluginOptionName(pluginName, 'customfilter');

export const register = (editor) => {
    const registerOption = editor.options.register;

    
    registerOption(customOptionName, {
        processor: 'string',
        "default": '', 
    });

    
    registerOption(customFilterName, {
        processor: 'boolean',
        "default": false,
    });
};

export const getCustomOptions = (editor) => {
    const optionsString = editor.options.get(customOptionName) || '';
    return optionsString.split('\n').map(option => option.trim()).filter(option => option);
};

export const isCustomFilterActive = (editor) => editor.options.get(customFilterName);