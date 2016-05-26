/**
 * Created by Antony on 2016-05-22.
 */

import {sayHello} from "./comp/greet"
import {EventForm} from "./comp/event-form"
import {Event} from "./domain/event"


function showHello(divName: string, name: string) {
    var event = new Event();
    var eventForm = new EventForm();

    console.log("Hello world...")
    
}

showHello("greeting", "Antony");