'use strict';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import {getAll, getById} from '../api/Phone.js';
import Component from '../Component.js';
import PhonesBasket from './PhonesBasket.js';

export default class PhonesPages extends Component {

    constructor(element) {
        super(element);

        //get array of mobiles from json;
        this.state = {
            phones: [],
            selectedPhone: null,
            basketItems: ['Iphone', 'Samsung'],
        };

        console.dir(this.state);

        this.addBasketItem = (phoneId) => {
            this.setState({
                basketItems: [
                    ...this.state.basketItems,
                    phoneId
                ],
            });
        };
        this.deleteBasketItem = (index) => {
            const items = this.state.basketItems;

            this.setState({
                basketItems: [
                    ...items.slice(0, index),
                    ...items.slice(index + 1)
                ],
            });
        }
        this.showPhone = (phoneId) => {
            getById(phoneId)
                .then(phoneDetails => {
                    this.setState({ selectedPhone: phoneDetails });
                });
        };
        this.hidePhone = () => {
            this.setState({
                selectedPhone: null,
            })
        }

        this.render();

        getAll()
            .then(phones => {
                this.setState({ phones: phones });
            });

    }


    render() {
        this.element.innerHTML = `
            <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>
      
      <PhonesBasket></PhonesBasket>

    </div>

    <!--Main content-->
    <div class="col-md-10">
        ${this.state.selectedPhone ? `
            <PhoneViewer></PhoneViewer>
        ` : `
            <PhonesCatalog></PhonesCatalog>
        `}
    </div>
      </div>
        `;

        this.initComponent(PhonesCatalog, {
            phones: this.state.phones,

            onPhoneSelected: this.showPhone,
            onAdd: this.addBasketItem
        });

        this.initComponent(PhoneViewer, {
            phone: this.state.selectedPhone,
            onBack: this.hidePhone,
            onAdd: this.addBasketItem
        });

        this.initComponent(PhonesBasket, {
            items: this.state.basketItems,
            onDelete : this.deleteBasketItem,
        });
    }


}