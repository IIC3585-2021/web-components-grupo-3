const template = document.createElement("template");
template.innerHTML = /*html*/`
<div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafs5NZuWI9ad5litaCZutQSJhkToqW5mbg3VIIk6NWFQAJCMIytIWrZfwjnm3lyGehZU&usqp=CAU"> 
    <div class="title">
        Título
    </div>
    <p class="price">Precio</p>
    <p class="sale">Precio descuento</p>
    <p class="discount">Porcentaje descuento</p>
    <p class="rating">Rating</p>
</div>
`

class SellItem extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes () {
    return ["title", "price", "sale", "discount", "rating"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    } 
    else if (name === "price") {
       this.shadowRoot.querySelector(".price").textContent = newValue;
    }
    else if (name === "sale") {
        this.shadowRoot.querySelector(".sale").textContent = newValue;
     }
     else if (name === "discount") {
        this.shadowRoot.querySelector(".discount").textContent = newValue;
     }
     else if (name === "rating") {
        this.shadowRoot.querySelector(".rating").textContent = newValue;
     }
  }
}

window.customElements.define("sell-item", SellItem);