import {getTinyMCE} from 'editor_tiny/loader'; 
import {getPluginMetadata} from 'editor_tiny/utils'; 
import {component, pluginName} from 'tiny_custombutton/common';
import * as Commands from './commands';
import * as Configuration from './configuration';
import * as Options from './options';

// eslint-disable-next-line no-async-promise-executor
export default new Promise(async (resolve) => {
    const [
        tinyMCE,
        setupCommands,
        pluginMetadata,
    ] = await Promise.all([
        getTinyMCE(), 
        Commands.getSetup(), 
        getPluginMetadata(component, pluginName), 
    ]);

    tinyMCE.PluginManager.add(`${component}/plugin`, (editor) => {
        // Register options.
        Options.register(editor);

        // Setup the Commands (buttons, menu items, and so on).
        setupCommands(editor);

        // Apply configuration.
        Configuration.configure(editor);

        return pluginMetadata;
    });

    resolve([`${component}/plugin`, Configuration]);
});

