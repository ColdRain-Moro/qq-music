export class RowSlideBox extends HTMLElement {

    constructor() {
        super();

        const template = document.querySelector("#row-list-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    loadData<T>(data: T[], createHtmlElement: (data: T) => HTMLElement) {
        const container = this.shadowRoot?.querySelector(".row-slide-box")! as HTMLElement;
        container.innerHTML = "";
        data.forEach(item => {
            const element = createHtmlElement(item);
            container.appendChild(element);
        })
    }
}

customElements.define('row-slide-box', RowSlideBox)