import { workspace } from "vscode";

export class Config {
    private config = workspace.getConfiguration('fuzzy-search');

    // get highlight() {
    //     return this.config.get("highlight");
    // }

    // get highlightDarkThemeColor() {
    //     return this.config.get("highlight-dark-theme-color");
    // }

    // get highlightLightThemeColor() {
    //     return this.config.get("highligh-light-theme-color");
    // }

    // get border() {
    //     return this.config.get("border");
    // }

    get borderDarkThemeColor() {
        return this.config.get("border-dark-theme-color");
    }

    get borderLightThemeColor() {
        return this.config.get("border-light-theme-color");
    }

    get borderRulerColor() {
        return this.config.get("border-ruler-color");
    }

    get relocation() {
        return this.config.get("relocation");
    }


}