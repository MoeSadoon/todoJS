const dataController = (function () {

    const data = {
        todos: [],
        done: []
    }

    return {
        addItem: function (input) {
            data.todos.push(input);
        },

        test: function () {
            return data;
        }
    }

})();


const uiController = (function () {

    const DOMstrings = {
        todos: '.todos',
        input: '.input'
    }

    return {
        getDOMStrings: function () {
            return DOMstrings;
        },

        getInput: function () {
            let input;

            input = document.querySelector(DOMstrings.input).value;
            return input;
        },

        addUI: function (input) {
            let listItemHTML;

            listItemHTML = document.createElement("li");
            listItemHTML.appendChild(document.createTextNode(input));
            document.querySelector(DOMstrings.todos).appendChild(listItemHTML);
        }
    }

})();


const appController = (function (uiCtrl, dataCtrl) {

    const DOMstrings = uiCtrl.getDOMStrings();

    const setUpEventlistener = () => {
        document.querySelector(DOMstrings.input).addEventListener('keypress', event => {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });
    }

    // Add item to controller
    const addItem = () => {
        // Get input from UI
        const input = uiCtrl.getInput();

        // Add to data storage
        dataCtrl.addItem(input);

        // Add input to UI
        uiCtrl.addUI(input);
    }

    return {
        init: function () {
            console.log("App has started");
            setUpEventlistener();
        }
    }

})(uiController, dataController);

//Initialize app on load
appController.init();