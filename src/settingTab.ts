import { App, PluginSettingTab, Setting } from "obsidian";
import RandomNotePlugin from "./main";
import { CONFIG_COUNT } from "./pluginSettings";

export class RandomNoteSettingTab extends PluginSettingTab {
	private plugin: RandomNotePlugin;

	constructor(app: App, plugin: RandomNotePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Current Filter')
			.addDropdown((dropdown) => {
				dropdown
					.addOptions([...Array(CONFIG_COUNT)].reduce((record: Record<string, string>, _, i) => {
						record[i.toString()] = `Filter ${i + 1}`;
						return record;
					}, {}))
					.setValue(this.plugin.settings.currentFilterIndex.toString())
					.onChange(async (id) => {
						this.plugin.settings.currentFilterIndex = Number(id);
						await this.plugin.saveSettings();
					})
			})

		for (let i = 0; i < CONFIG_COUNT; i++) {
			containerEl.createEl('h3', { text: `Filter ${i + 1}` });

			new Setting(containerEl)
				.setName('Paths')
				.setDesc('A file is considered a candidate if its path starts with any of these paths. One path per line.')
				.addTextArea((text) =>
					text.setValue(this.plugin.settings.filters[i].paths.join('\n'))
						.onChange(async (value) => {
							const paths = value.split('\n').map((path) => path.trim()).filter((path) => path.length !== 0);
							this.plugin.settings.filters[i].paths = paths;
							await this.plugin.saveSettings();
						}));
		}
	}
}

