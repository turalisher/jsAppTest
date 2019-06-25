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
            phones: getAll(),
            selectedPhone: null,
            basketItems: ['Iphone', 'Samsung'],
        };

        console.dir(this.state);

        this.addBasketItem = (phoneId) => {
            this.setState({basketItems : [
                    ...this.state.basketItems,
                    phoneId
                ],
            });
        };
        this.showPhone = (phoneId) => {
            this.setState({
                selectedPhone: getById(phoneId)
            })
        };
        this.hidePhone = () => {
            this.setState({
                selectedPhone: null,
            })
        }

        this.render();

    }

    initComponent(constructor, props) {
        const container = this.element.querySelector(constructor.name);

        if (!container) {
            return;
        }

        new constructor(container, props);
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
    items: this.state.basketItems
});
}


}