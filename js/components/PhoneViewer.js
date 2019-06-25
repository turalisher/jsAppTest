import Component from '../Component.js';

export default class PhoneViewer extends Component{
    constructor(element, props) {
        super(element, props); //вызываем конструктор Component
        this.state = {
            currentImage: this.props.phone.images[0]
        }

        this.render();

        this.on('click', 'back-button', this.props.onBack);
        this.on('click', 'thumbnail', (event) => {
            this.setState({
                currentImage: event.delegateTarget.src,
            })
        });

        // this.element.addEventListener('click', (event) => {
        //     const delegateTarget =
        //         event.target.closest('[data-element="thumbnail"]');
        //
        //     if (!delegateTarget) {
        //         return;
        //     }
        //
        //     this.state = {
        //         ...this.state,
        //         currentImage: delegateTarget.src,
        //     };
        //
        //     this.render();
        // });
    }

    render() {
        const {phone} = this.props;
        const {currentImage} = this.state;
        console.log(phone);

        this.element.innerHTML = `
            <div>

             <img class="phone" src="${currentImage}">
            
                <button data-element="back-button">Back</button>
                <button>Add to basket</button>
            
            
                <h1>${phone.name}</h1>
            
                <p>${phone.description}</p>
             
                <ul class="phone-thumbs">
                  ${phone.images.map(imageUrl => `
                  <li>
                    <img 
                        src="${imageUrl}"
                        data-element="thumbnail">
                        
                  </li>
                  
                  `).join('')}

                </ul>
            </div>  
        `;
    }



}