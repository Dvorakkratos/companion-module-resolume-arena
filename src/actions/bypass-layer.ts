import {CompanionActionDefinition} from '@companion-module/base';
import {LayerOptions} from '../arena-api/child-apis/layer-options/LayerOptions';
import ArenaOscApi from '../arena-api/osc';
import ArenaRestApi from '../arena-api/rest';
import {getLayerOption} from '../defaults';

export function bypassLayer(
	restApi: () => ArenaRestApi | null,
	_oscApi: () => ArenaOscApi | null
): CompanionActionDefinition {
	return {
		name: 'Bypass Layer',
		options: [
			...getLayerOption(),
			{
				id: 'bypass',
				type: 'dropdown',
				choices: [
					{
						id: 'on',
						label: 'On',
					},
					{
						id: 'off',
						label: 'Off',
					},
					{
						id: 'toggle',
						label: 'Toggle',
					},
				],
				default: 'toggle',
				label: 'Bypass',
			},
		],
		callback: async ({options}: {options: any}) => {
			let theApi = restApi();
			if (options.bypass == 'toggle') {
				var settings = (await theApi?.Layers.getSettings(options.layer)) as LayerOptions;
				await theApi?.Layers.updateSettings(options.layer, {
					bypassed: !settings.bypassed?.value,
				});
			} else {
				await theApi?.Layers.updateSettings(options.layer, {
					bypassed: options.bypass == 'on',
				});
			}
		},
	};
}
