export class Search extends HTMLElement {

    onSearch: (keyword: string) => void = () => { };

    constructor() {
        super();

        const template = document.querySelector("#search-template") as HTMLTemplateElement;
        const templateContent = template.content;

        this.attachShadow({ mode: "open" })
            .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        const btn = this.shadowRoot?.querySelector(".cancel-btn")! as HTMLElement
        const input = this.shadowRoot?.querySelector(".search-input") as HTMLInputElement
        const searchPage = document.querySelector("#recommend-search-page")! as HTMLElement
        const contentPage = document.querySelector("#recommend-content-page")! as HTMLElement
        const innerSearchPage = document.querySelector("#search-page")! as HTMLElement
        const innerSearchResultPage = document.querySelector("#search-result-page")! as HTMLElement
        input.addEventListener("focus", () => {
            btn.style.display = "block";
            searchPage.style.display = "block";
            contentPage.style.display = "none";
        })
        input.addEventListener("keyup", () => {
            if (input.value.length > 0) {
                this.onSearch(input.value);
            }
        });
        btn.addEventListener("click", () => {
            btn.style.display = "none";
            searchPage.style.display = "none";
            contentPage.style.display = "block";
            innerSearchPage.style.display = "block";
            innerSearchResultPage.style.display = "none";
        })
    }
}

customElements.define('search-bar', Search)