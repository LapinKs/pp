import {getTinyMCE} from 'editor_tiny/loader'; 
import {getPluginMetadata} from 'editor_tiny/utils'; 

import {component, pluginName} from 'tiny_custombutton/common';
import * as Commands from './commands';
import * as Configuration from './configuration';
import * as Options from './options';

// eslint-disable-next-line no-async-promise-executor
export default new Promise(async (resolve) => {
    // const pageContext = M.cfg.pagecontext; // Получить контекст страницы.
    // if (pageContext !== 'mod_quiz-question-ddwots') {
    //     return resolve(); // Не активируем плагин.
    // }

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
        Options.register(editor);
        setupCommands(editor);
        return pluginMetadata;
    });

    resolve([`${component}/plugin`, Configuration]);
});