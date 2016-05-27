/**
 * Created by ant on 5/25/2016.
 */

import Event from "Ev";
import User from "User";

describe("An event", function () {

    var event;
    beforeEach(function () {
        event = new Event();
    });

    it("contains user type as user field", function () {

        var user1 = new User();
        event.user = user1;

        expect(event.user).toBe(user1);
    });
});

describe("Included matchers:", function () {

    it("The 'toBe' matcher compares with ===", function () {
        var a = 12;
        var b = a;

        expect(a).toBe(b);
        expect(a).not.toBe(null);
    });
});