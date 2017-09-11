const dataController = (function () {

    //Where the todos are stored
    const data = {
        todos: [],
        done: []
    };

    class Todo {
        constructor(id, description) {
            this.id = id;
            this.description = description;
        }
    }

    return {
        addItem: function (input) {
            let ID, item;

            if (data.todos.length > 0) {
                ID = data.todos[data.todos.length - 1].id + 1
            }
            else {
                ID = 0;
            }
            
            /* When addItem is called and new item is created, two things happen:
                1. the newly created item is added to the todos array
                2. it is also returned so it can be used to be added to UI*/
            item = new Todo(ID, input);
            data.todos.push(item);
            return item;
        },

        test: function () {
            return data;
        }
    }

})();

const uiController = (function () {

    const domStrings = {
        todos: '.todos',
        input: '.input',
    }

    return {
        getDomStrings: function () {
            return domStrings;
        },

        getInput: function () {
            const input = document.querySelector(domStrings.input).value;
            return input;
        },

        addUiItem: function (item) {
            let listHtml, description, delBtn;

            // Creates list element with its unique id and description
            listHtml = document.createElement("li");
            listHtml.setAttribute("id", `${item.id}`);
            description = document.createTextNode(`${item.description}`);
            listHtml.appendChild(description);

            // Creates delete button which becomes child of each list item
            delBtn = document.createElement("button");
            btnDesc = document.createTextNode("Delete");
            delBtn.appendChild(btnDesc);
            listHtml.appendChild(delBtn);
            
            // Finally append it to the todos list
            document.querySelector(domStrings.todos).appendChild(listHtml);
        },

        clearInput: function () {
            document.querySelector(domStrings.input).value = '';
        }
    }


})();

const appController = (function (uiCtrl, dataCtrl) {
    const domStrings = uiCtrl.getDomStrings();

    //Listens for everytime we hit enter on the input field so we can add a list item
    const setupEventListeners = () => {
        document.querySelector(domStrings.input).addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    }

    const ctrlAddItem = () => {
        let input, item;
        // Get the input
        input = uiCtrl.getInput();

        // Add new item to data
        item = dataCtrl.addItem(input);

        // Add new item to UI
        uiCtrl.addUiItem(item);

        // Clear input form
        uiCtrl.clearInput();
    }

    return {
        init: function () {
            console.log("app has started");
            setupEventListeners();
        }
    }

})(uiController, dataController);

appController.init();