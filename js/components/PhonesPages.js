'use strict';
import PhonesCatalog from './PhonesCatalog.js';

export default class PhonesPages {

    constructor(element) {
        this.element = element;

        this.render();

        new PhonesCatalog(
          document.querySelector('PhonesCatalog')
        );
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
        <PhonesCatalog></PhonesCatalog>
    </div>
      </div>
        `;
    }


    
}