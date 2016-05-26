/**
 * Created by Antony on 2016-05-22.
 */

import {EventForm} from "./comp/event-form"
import Event from "./domain/event"
import {_} from "underscore"
import $ from 'jquery';

// _.each([1, 2, 3], alert);

class MainPage {
    constructor() {
        var ev = new Event();
    }

    render(id:string, templateName:string){
        console.log("aaaaas");
        $(id).load(templateName);
    }
}

new MainPage().render('#nav-bar', '/templates/nav-bar.html');