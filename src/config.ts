import { workspace } from "vscode";

export class Config {
    private config = workspace.getConfiguration('fuzzy-search');

    get highlight() {
        return this.config.get("highlight");
    }
    get border() {
        return this.config.get("border")
    }

    get borderDarkThemColor() {
        return this.config.get("border-dark-them-color")
    }
    get borderLightThemColor() {
        return this.config.get("border-light-them-color")
    }

    get borderRulerColor() {
        return this.config.get("border-ruler-color")
    }

    get relocation() {
        return this.config.get("relocation");
    }


}