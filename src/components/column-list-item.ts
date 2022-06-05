export class ColumnListItem extends HTMLElement {
    constructor() {
        super();

        const template = document.querySelector("#column-list-item-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        const icon = this.getAttribute("icon")
        const background = this.getAttribute("background")
        if (icon != null) {
            const iconElement = this.shadowRoot!.querySelector("img")!
            iconElement.src = icon
        }
        if (background != null) {
            const bg = this.shadowRoot!.querySelector(".song-img") as HTMLElement
            bg.style.background = `url(${background})`
            bg.style.backgroundSize = 'cover'
            bg.style.backgroundRepeat = 'no-repeat'
        }
    }
}

customElements.define('column-list-item', ColumnListItem)