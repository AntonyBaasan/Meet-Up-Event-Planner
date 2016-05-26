/**
 * Created by Antony on 2016-05-22.
 */

import {sayHello} from "./comp/greet"
import {EventForm} from "./comp/event-form"
import {Event} from "./domain/event"
import {_} from "underscore"


function showHello(divName: string, name: string) {
    var event = new Event();
    var eventForm = new EventForm();

    // _.each([1, 2, 3], alert);

    console.log("Hello world...")
    
}

showHello("greeting", "Antony");