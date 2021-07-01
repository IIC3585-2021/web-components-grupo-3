// const styles2 = `<style>
//     .todo-card{
//     width: 300px;
//     max-height: 90%px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
//     margin: 20px;
//     }
//     .list-title{
//     color: white;
//     font-size: 1.4rem;
//     display: block;
//     text-align: center;
//     font-weight: 400;
//     margin: 0;
//     padding: 15px;
//     border-bottom: 1px grey solid;
//     background: teal;
//     text-transform: uppercase;
//     }
//     #list-container{
//     display: flex;
//     flex-direction: column;
//     max-height: 300px;
//     overflow-y: auto;
//     }
//     .item{
//     box-shadow: 0 0px 1px rgba(0, 0, 0, 0.25);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin: 0;
//     padding: 5px 6px 6px 20px ;
//     }
//     p{
//     margin: 0;
//     font-size: 16px;
//     }
//     mwc-button {
//     --mdc-theme-primary: teal;
//     margin: 0;
//     }
//     mwc-textfield{
//     padding: 5px;
//     width: 290px;
//     --mdc-theme-primary: black;
//     }
// </style>`

// const sheet2 = new CSSStyleSheet();
// sheet2.replaceSync(styles);

const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
    <li class="item">
        <label></label>
        <button class="destroy">x</button>
    </li>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true));
        // this.shadowRoot.adoptedStyleSheets = [sheet2]
    }

    connectedCallback() {
        this.item = this.shadowRoot.querySelector('.item');
        this.removeButton = this.shadowRoot.querySelector('.destroy');
        this.textLabel = this.shadowRoot.querySelector('label');
        this.textLabel.textContent = this.text
        this.removeButton.addEventListener('click', (e) => {
            console.log(this._id)
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this._id }));
        });
    }


    static get observedAttributes() {
        return ['text', "_id"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "text"){
            this.text = newValue;
        }
        else{
            this._id = newValue;
        }
    }
}

window.customElements.define('list-item', TodoItem);