export class ColumnSlideBox extends HTMLElement {

    constructor() {
        super();

        const template = document.querySelector("#column-slide-box-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    loadData<T>(data: T[], createHtmlElement: (data: T) => HTMLElement) {
        const container = this.shadowRoot?.querySelector(".column-slide-box")! as HTMLElement;
        container.innerHTML = "";
        data.forEach(item => {
            const element = createHtmlElement(item);
            container.appendChild(element);
        })
    }

}

customElements.define('column-slide-box', ColumnSlideBox)