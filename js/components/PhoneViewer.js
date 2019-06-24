export default class PhoneViewer {
    constructor(element,props) {
        this.element = element;
        this.props = props;
        this.state = {
            currentImage : this.props.phone.images[0]
        }

        this.render();

        this.element.addEventListener('click', (event) => {
            const delegateTarget = event.target.closest("[data-element=\"back-button\"]")

            if (!delegateTarget) {
                return;
            }

            this.props.onBack();
        })
    }

    render() {
        const { phone }  = this.props;
        console.log(phone);

        this.element.innerHTML = `
            <div>

                <img class="phone" src="${this.state.currentImage}">
            
                <button data-element="back-button">Back</button>
                <button>Add to basket</button>
            
            
                <h1>${phone.name}</h1>
            
                <p>${phone.description}</p>
             
                <ul class="phone-thumbs">
                  ${phone.images.map(imageUrl => `
                  <li>
                    <img src="${imageUrl}">
                  </li>
                  
                  `).join('')}

                </ul>
            </div>  
        `;
    }
}