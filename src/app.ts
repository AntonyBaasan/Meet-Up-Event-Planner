/**
 * Created by Antony on 2016-05-22.
 */

import {sayHello} from "./comp/greet"

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "Antony");