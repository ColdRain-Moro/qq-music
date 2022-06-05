export class SongItem extends HTMLElement {
    constructor() {
        super();

        const template = document.querySelector("#song-item-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }
}

customElements.define('song-item', SongItem);