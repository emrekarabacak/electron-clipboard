const { ipcRenderer } = require('electron')

var stack = []
let latest

ipcRenderer.on('new-value-captured', (event, arg) => {
    push(stack, arg)
})

ipcRenderer.on('clear-stack', _ => {
    clearStack()
})

$("#valuelist").on("click", "li", function (event) {
    ipcRenderer.send('value-selected', this.innerHTML)
    latest = this.innerHTML
});

function clearStack() {
    $("#valuelist").empty()
    stack = []
}

function push(stack, value) {

    if (latest == value) {
        return;
    }

    stack.push(value)
    $(document).ready(function () {
        list = "<li class='item'>" + stack[stack.length - 1] + "</li>";
        $("#valuelist").prepend(list);
    });
}
