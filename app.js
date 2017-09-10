const dataController = (function () {

    const data = {
        todos: [],
        done: [],
    }

})();

const uiController = (function () {

    return {
        getInput: function () {
            const input = document.querySelector('.input').value;
            console.log(input);
        }
    }

})();

const appController = (function (uiCtrl) {

    // Add item to controller
    const addItem = () => {
        // Get input from UI
        uiCtrl.getInput();

        // Add to data storage

        // Add input to UI
    }

})(uiController);