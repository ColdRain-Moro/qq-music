export class RankItem extends HTMLElement {
    constructor() {
        super();

        const template = document.querySelector("#rank-item-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        const cover = this.getAttribute("cover")
        if (cover != null) {
            const img = this.shadowRoot?.querySelector(".right-box") as HTMLElement
            img.style.background = `url(${cover})`;
            img.style.backgroundSize = "cover";
            img.style.backgroundRepeat = 'no-repeat';
        }
    }
}

customElements.define('rank-item', RankItem);