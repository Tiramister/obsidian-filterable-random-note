import { Notice, Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
	private previousPath = "";

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('dice', 'Open Random Note', () => {
			this.activate();
		});
	}

	onunload() {
	}

	async loadSettings() {
	}

	async saveSettings() {
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

