const styles = /*css*/ `
#container {
  width: 300px;
  margin: 0 auto; 
  margin-top: 20px;
  margin-left: 10px
}
#card {
  background-color: white;
  border: 1px solid #bacdd8;
  padding: 8px;
  border-radius: 12px;
  text-align: center;
}
.image {
  width: 80%;
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
  max-height: 250px;
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
`
const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement("template");
template.innerHTML = /*html*/ `
<div id="container">
<div id="card">
    <div class="image">
    <img \>
        <h3 class="title">Título</h3>
        <strike><p class="price">Precio</p></strike>
        <h6 class="sale">$100.00</h6>
    </div>
    <div class="footer">
    <p>Valoracion:</p>
    <p class="rating">Rating</p>
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
        return ["avatar", "title", "price", "sale", "discount", "rating"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
            this.shadowRoot.querySelector(".title").textContent = newValue;
        } else if (name === "price") {
            this.shadowRoot.querySelector(".price").textContent = newValue;
        } else if (name === "sale") {
            this.shadowRoot.querySelector(".sale").textContent = newValue;
        } else if (name === "discount") {
            this.shadowRoot.querySelector(".discount").textContent = `-${newValue}`;
        } else if (name === "rating") {
            this.shadowRoot.querySelector(".rating").textContent = newValue;
        } else if (name === "avatar") {
            this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        }
    }
}

window.customElements.define("sell-item", SellItem);