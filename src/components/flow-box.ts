export class FlowBox extends HTMLElement {
    constructor() {
        super();

        const template = document.querySelector("#flow-box-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    loadData<T>(data: T[], createHtmlElement: (data: T) => HTMLElement) {
        const container = this.shadowRoot?.querySelector(".flow-box")! as HTMLElement;
        container.innerHTML = "";
        data.forEach(item => {
            const element = createHtmlElement(item);
            container.appendChild(element);
        })
    }
}

customElements.define('flow-box', FlowBox);