'use strict';
import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import {getAll, getById} from '../api/Phone.js';
export default class PhonesPages {

    constructor(element) {
        this.element = element;


        //get array of mobiles from json;
        this.state = {
            phones : getAll(),
            selectedPhone : null,
        };

        console.dir(this.state);

        this.render();

        this.initComponent(PhonesCatalog, {phones : this.state.phones})
        this.initComponent(PhoneViewer, {phone : this.state.selectedPhone})
    }

    initComponent(constructor, props) {
        const container = this.element.querySelector(constructor.name);

        if (!container) {
            return;
        }

        new constructor(container,props);
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

      <section>
        <p>Shopping Cart</p>
        <ul>
          <li>Phone 1 <button>x</button></li>
          <li>Phone 2 <button>x</button></li>
          <li>Phone 3 <button>x</button></li>
        </ul>
      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10">
        ${this.state.selectedPhone ? `
            <PhoneViewer></PhoneViewer>
        ` : `
            <PhonesCatalog></PhonesCatalog>
        ` }
    </div>
      </div>
        `;
    }


    
}