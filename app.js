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

        deleteItem: function (id) {
            data.todos.pop(id);
        },

        deleteAll: function (nodeArr) {
            nodeArr.forEach(el => data.todos.pop(el));
        },

        taskCount: function () {
            return data.todos.length;
        },

        test: function () {
            return data;
        }
    }

})();

const uiController = (function (dataCtrl) {

    const domStrings = {
        todos: '.todos',
        input: '.input',
        delAll: '.delete-all'
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
            let listHtml, description, delBtn, doneBtn, doneBtnDesc

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

            // // Creates 'completed' button for when task is done
            // doneBtn = document.createElement("button");
            // doneBtnDesc = document.createTextNode("Completed");
            // doneBtn.appendChild(doneBtnDesc);
            // listHtml.appendChild(doneBtn);

            // Finally append it to the todos list
            document.querySelector(domStrings.todos).appendChild(listHtml);
        },

        deleteUiItem: function (id) {
            let node;
            node = document.getElementById(id);
            node.parentElement.removeChild(node);
        },

        deleteUiAll: function (nodeArr) {
            nodeArr.forEach(el => el.parentElement.removeChild(el));
        },

        clearInput: function () {
            document.querySelector(domStrings.input).value = '';
        },

        updateHeader: function () {
            let header, count, newHeader;

            header = document.querySelector('h2');
            count = dataCtrl.taskCount();

            /*
            If the header doesnt have a number it just replaces the placeholder '%n%'
            But if theres already a number, it replaces it using a regex 
            */
            if (header.innerHTML.includes('%n%')) {
                newHeader = header.innerHTML.replace('%n%', count)
            }
            else {
                newHeader = header.innerHTML.replace(/\d+/, count)
            }
            header.innerHTML = newHeader;
        },

        updateDate: function () {
            let header, newHeader;

            header = document.querySelector('h1');
            const date = new Date();
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            header.innerHTML = `${days[date.getDay() - 1]} ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
        }
    }


})(dataController);

const appController = (function (uiCtrl, dataCtrl) {
    const domStrings = uiCtrl.getDomStrings();

    //Listens for everytime we hit enter on the input field so we can add a list item
    const setupEventListeners = () => {
        document.querySelector(domStrings.input).addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

        // Delegate click event to todos ul up the dom tree to look out for click on button   
        document.querySelector(domStrings.todos).addEventListener('click', ctrlDeleteItem);
        // 'Delete all' button

        document.querySelector(domStrings.delAll).addEventListener('click', ctrlDeleteAll, true);
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

        // Update header count;
        uiCtrl.updateHeader();
    }

    const ctrlDeleteItem = (e) => {
        let id;

        // Isolate ID of list item to be deleted
        id = e.target.parentNode.id;

        // Delete from data store using id
        dataCtrl.deleteItem(id);

        // Delete from UI using id
        uiCtrl.deleteUiItem(id);

        uiCtrl.updateHeader();
    }

    const ctrlDeleteAll = () => {
        //retrieve all list items
        const allItems = Array.from(document.querySelectorAll('li'));

        // Delete all from data storage
        dataCtrl.deleteAll(allItems)

        // Delete all from UI
        uiCtrl.deleteUiAll(allItems);
    }

    return {
        init: function () {
            console.log("app has started");
            setupEventListeners();
            uiCtrl.updateHeader();
            uiCtrl.updateDate();
        }

    }

})(uiController, dataController);

appController.init();