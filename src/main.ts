import { Notice, Plugin } from 'obsidian';
import { EMPTY_SETTINGS, RandomNotePluginSettings } from './pluginSettings';
import { RandomNoteSettingTab } from './settingTab';

export default class RandomNotePlugin extends Plugin {
	settings: RandomNotePluginSettings;

	private previousPath = "";

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dice', 'Open Random Note', () => {
			this.activate();
		});
		this.addSettingTab((new RandomNoteSettingTab(this.app, this)));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign(structuredClone(EMPTY_SETTINGS), await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private async activate() {
		try {
			const leaf = this.app.workspace.getLeaf(false);
			leaf.openFile(this.selectRandomNote());
		} catch (e) {
			new Notice(e);
		}
	}

	private selectRandomNote() {
		let files = this.app.vault.getMarkdownFiles();
		if (files.length === 0) {
			throw new Error("No notes found");
		}

		// Select a file that is different from the previous one
		const freshFiles = files.filter((file) => file.path !== this.previousPath);
		if (freshFiles.length !== 0) {
			files = freshFiles;
		}

		const file = files[Math.floor(Math.random() * files.length)];
		this.previousPath = file.path;
		return file;
	}
}

