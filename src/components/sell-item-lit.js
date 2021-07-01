import { LitElement, html, css } from 'lit-element';

class SellItemLi extends LitElement {
    static get styles() {
        return css /*css*/ ` 
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
          `;
    }
    static get properties() {
        return {
            avatar: { type: String, reflect: true },
            title: { type: String, reflect: true },
            price: { type: String, reflect: true },
            sale: { type: String, reflect: true },
            rating: { type: String, reflect: true },
            discount: { type: String, reflect: true },
        };
    }
    constructor() {
        super();
        this.avatar = '#';
        this.title = 'Example';
        this.price = "111 USD";
        this.sale = "111 USD"
        this.rating = '0'
        this.discount = '0'
    }
    render() {
        return html /*html*/ `
    <div id="container">
        <div id="card">
            <div class="image">
                <img src="${this.avatar}">
                <h3 class="title">${this.title}</h3>
                <strike><p class="price">${this.price}</p></strike>
                <h6 class="sale">${this.sale}</h6>
            </div>
            <div class="footer">
                <p>Valoracion:</p>
                <p class="rating">${this.rating}</p>
                <p class="discount">-${this.discount}</p>
            </div>
        </div>
    </div>
    `;
    }
};

customElements.define('sell-item-li', SellItemLi);