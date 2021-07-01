import "./list-item.js"
const styles = `<style>
    .todo-card{
    width: 300px;
    max-height: 90%px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    margin: 20px;
    border: solid;
    }
    .list-title{
    color: white;
    font-size: 1.4rem;
    display: block;
    text-align: center;
    font-weight: 400;
    margin: 0;
    padding: 15px;
    border-bottom: 1px grey solid;
    background: teal;
    text-transform: uppercase;
    }
    #list-container{
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    }
    .list-item{
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 5px 6px 6px 20px ;
    }
    p{
    margin: 0;
    font-size: 16px;
    }
    mwc-button {
    --mdc-theme-primary: teal;
    margin: 0;
    }
    mwc-textfield{
    padding: 5px;
    width: 290px;
    --mdc-theme-primary: black;
    }
</style>`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const templateTodo = document.createElement('template');
templateTodo.innerHTML = `
    <script src="./list-item.js"></script>
    <div class='todo-card'>
        <div class='list-title'>Titulo</div>
        <form id='new-todo-form'>
            <input id='new-todo' type='text' placeholder='What needs to be done?'>
        </form>
        <ul id='list-container'></ul>
    </div>
`;


class MyTodo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(templateTodo.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [sheet]
        this.list = []
    }

    connectedCallback() {
        this.titleLabel = this.shadowRoot.querySelector(".list-title")
        this.titleLabel.textContent = this.title
        this.list = [this.item1, this.item2, this.item3]
        this.input = this.shadowRoot.querySelector('input');
        this.form = this.shadowRoot.querySelector("form")
        this.shadowRoot.querySelector("#new-todo").placeholder = this.prompt
        this.listContainer = this.shadowRoot.querySelector('#list-container');
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!this.input.value) return;
            this.addItem(this.input.value)
            this.input.value = "";
        });
        console.log(this.list)
        console.log(this.listContainer)
        if (!this.listContainer) return;
        this.updateItems();
    }

    static get observedAttributes() {
        return ['title', 'item1','item2', 'item3', 'prompt'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(newValue)
        console.log(name)
        if (name === "title"){
            this.title = newValue;
        }
        else if (name === "item1"){
            this.item1 = newValue;
        }
        else if (name === "item2"){
            this.item2 = newValue;
        }
        else if (name === "item3"){
            this.item3 = newValue;
        }
        else if (name === "prompt"){
            this.prompt = newValue;
        }
    }

    addItem(value) {
        console.log(value)
        this.list.push(value);
        this.updateItems()
    }

    removeItem(e) {
        this.list.splice(e.detail, 1);
        this.updateItems()
    }

    updateItems() {
        this.listContainer.innerHTML = '';
        this.list.forEach((item, index) => {
            let htmlItem = document.createElement('list-item');
            htmlItem.setAttribute('text', item);
            htmlItem.setAttribute('_id', index);
            htmlItem.addEventListener('onRemove', this.removeItem.bind(this));
            console.log(htmlItem)
            this.listContainer.appendChild(htmlItem);
        });
    }
}

window.customElements.define('my-todo', MyTodo);