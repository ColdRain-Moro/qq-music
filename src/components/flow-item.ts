export class FlowItem extends HTMLElement {

    onItemClick: (item: FlowItem) => void = () => { };

    constructor() {
        super();

        const template = document.querySelector("#flow-item-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        const item = this.shadowRoot!.querySelector(".flow-item-box") as HTMLElement;
        item.addEventListener("click", () => this.onItemClick(this));
    }
}

customElements.define('flow-item', FlowItem);