export default class Tab extends HTMLElement {

    constructor() {
        super();

        const template = document.querySelector("#tab-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    // 绑定事件
    connectedCallback() {
        this.shadowRoot!.querySelectorAll(".tab-item")
            .forEach(item => {
                item.addEventListener("click", () => {
                    this.shadowRoot?.querySelector(".selected")?.classList.remove("selected");
                    item.classList.add("selected");
                    if (item.classList.contains("recommend")) {
                        (document.querySelector("#rank-page")! as HTMLElement).style.display = "none";
                        (document.querySelector("#recommend-page")! as HTMLElement).style.display = "block";
                    } else {
                        (document.querySelector("#recommend-page")! as HTMLElement).style.display = "none";
                        (document.querySelector("#rank-page")! as HTMLElement).style.display = "block";
                    }
                });
            })
    }
}

customElements.define('tab-header', Tab)
