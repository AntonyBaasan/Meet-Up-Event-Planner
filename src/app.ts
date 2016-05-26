/**
 * Created by Antony on 2016-05-22.
 */

import {EventForm} from "./comp/event-form"
import Event from "./domain/event"
import {_} from "underscore"
import $ from 'jquery';

// _.each([1, 2, 3], alert);

class MainPage {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;

        var ev = new Event();
    }

    render(){
        console.log("Hello world...");
        //document.getElementById("main-page").innerText = "Hello ...";

        $('#nav-bar').load('/templates/nav-bar.html');
        
        //document.getElementById("nav-bar")
    }
}

new MainPage("world").render();