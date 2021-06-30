const styles = /*css*/ `
#container {
  max-width: 300px;

  /* Center the container in middle on horizontal axis */
  margin: 0 auto;

  /* Add empty space above the container (20% of the view height) */
  margin-top: 20vh;
}
   #card {
      /* Change background color */
      background-color: white;
      /* Add border */
      border: 1px solid #bacdd8;
      /* Add space between the border and the content */
      padding: 8px;
      border-radius: 12px;
      text-align: center;
    }
    .image {
      width: 70%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      margin-top: 16px;
    }
    img{
      text-align: center;
      margin: 0 auto;
      display: block;
      }
      p{
      text-align: center;
      color: #b2bec3;
      padding: 0 8px;
      }
      h6{
      font-size: 26px;
      text-align: center;
      color: #222f3e;
      margin: 0;
      }
      ul{
      list-style-type: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px;
      }
      li{
      padding: 5px;
      }
    .footer {
      display: flex;
      width: 100%;
    }
    .discount {
        margin-left: auto;
        color:red;
      }
    .negative {
        color:red;
        margin-left: 90px;
      }
`
const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement("template");
template.innerHTML = /*html*/ `
<div id="container">
<div id="card">
    <div class="image">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafs5NZuWI9ad5litaCZutQSJhkToqW5mbg3VIIk6NWFQAJCMIytIWrZfwjnm3lyGehZU&usqp=CAU">
        <h3 class="title">Título</h3>
        <strike><p class="sale">Precio</p></strike>
        <h6 class="price">$100.00</h6>
    </div>
    <div class="footer">
    <p>Valoracion:</p>
    <p class="rating">Rating</p>
    <p class="negative">-</p>
    <p class="discount">Porcentaje descuento</p>
    </div>
</div>
</div>
`

class SellItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ "mode": "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [sheet]
    }

    static get observedAttributes() {
        return ["title", "price", "sale", "discount", "rating"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
            this.shadowRoot.querySelector(".title").textContent = newValue;
        } else if (name === "price") {
            this.shadowRoot.querySelector(".price").textContent = newValue;
        } else if (name === "sale") {
            this.shadowRoot.querySelector(".sale").textContent = newValue;
        } else if (name === "discount") {
            this.shadowRoot.querySelector(".discount").textContent = newValue;
        } else if (name === "rating") {
            this.shadowRoot.querySelector(".rating").textContent = newValue;
        }
    }
}

window.customElements.define("sell-item", SellItem);