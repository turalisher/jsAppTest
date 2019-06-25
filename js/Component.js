export default class Component {

    constructor(element, props = {}) {
        this.element = element;
        this.props = props;

        this.children = {}; //складываем все созданные компоненты по имени
    }

    initComponent(constructor, props) {
        const container = this.element.querySelector(constructor.name);


        if (!container) {
            //если компонента нет на странице то удаляем его
            delete this.children[constructor.name];
            return;
        }

        const current = this.children[constructor.name];
        //Проверяем если у старого компонента и нового ли поменялись свойста?
        if (current && _.isEqual(props, current.props)) {
            container.replaceWith(current.element)
        } else {
            this.children[constructor.name] = new constructor(container, props);

        }



    }

    setState(data) {
        this.state = {
            ...this.state,
            ...data
        };

        this.render();
    }

    on(eventName, elementName, callback) {
        this.element.addEventListener(eventName, (event) => {
            const delegateTarget = event.target.closest(`[data-element="${elementName}"]`);

            if (!delegateTarget) {
                return;
            }
            event.delegateTarget = delegateTarget;
            callback(event);
        });
    }
}