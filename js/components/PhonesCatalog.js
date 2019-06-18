'use strict';

export default class PhonesCatalog {
    constructor(element, props){
        this.element = element;
        this.props = props;

        this.render();

        this.element.addEventListener('click', (event) => {
            const delegateTarget = event.target.closest("[data-element=\"phone-link\"]")

            if (!delegateTarget) {
                return;
            }

            this.props.onPhoneSelected(delegateTarget.dataset.phoneId);
        })
    }

    render() {
        this.element.innerHTML = `
            <ul class="phones">
            <!-- Получаем массив, join нужен чтобы убрать запятую по умолчанию -->
            ${ this.props.phones.map(phone => `
                <li class="thumbnail">
                  <a 
                    data-element="phone-link"
                    data-phone-id="${phone.id}"
                    href="#!/phones/${phone.id}" class="thumb">
                    <img alt="Motorola XOOM™ with Wi-Fi" src="${phone.imageUrl}">
                  </a>
        
                  <div class="phones__btn-buy-wrapper">
                    <a class="btn btn-success">
                      Add
                    </a>
                  </div>
        
                  <a data-element="phone-link" data-phone-id="${phone.id}" href="#!/phones/${phone.id}">${phone.name}</a>
                  <p>${phone.snippet}</p>
                </li>
            `).join('')}
                
            </ul>
        `;
    }

}