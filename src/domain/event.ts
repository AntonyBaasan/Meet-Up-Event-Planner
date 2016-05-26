/**
 * Created by Antony on 2016-05-25.
 */

import EventType from "./event_type"
import User from "./user";

export default class Event{
    name: string;
    type: EventType;
    host: User;
    startDate: string;
    endDate: string;
    guest: User[];
    location: string;
    message: string;

    constructor(){
        console.log("New Event Created");
    }
}
