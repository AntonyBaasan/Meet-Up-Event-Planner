import Event from "./domain/event";
import $ from 'jquery';
class MainPage {
    constructor() {
        var ev = new Event();
    }
    render(id, templateName) {
        console.log("aaaaas");
        $(id).load(templateName);
    }
}
new MainPage().render('#nav-bar', '/templates/nav-bar.html');
