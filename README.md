# vanillaJS-breakout

- Next up, WebGL tut! Here's a [link](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) to this one.
- I had an issue with hoisting. So I'm so used to using ```const``` to declare functions that I didn't realize when you addEventListener(s) in vanilla JS you can't use that syntax. You have to use the ```function``` keyword if you want your event listeners at the top.
- For the mouse tracking event listener, I think there are some rounding issues because the paddle is iffy on whether it properly snaps to the edge of the canvas. I'm assuming it's because I'm letting JS do its thing.
- From here I want to make a flappy bird game after I do the WebGL tut.
- Also, odd side note the creator of this tut didn't use a Boolean for when the brick was hit or not. They chose to use a 1 or a 0, not sure if that's coding preference or best practice.
- Last note, you don't have to ```context.closePath()``` for rect's and arc's, it's only for when you are drawing lines like for say, a triangle, so those lines are redundant in some places. I literally learned that from a different Mozilla webpage, which I find quite humorous.
- Side side note the more I use the term 'tut' the less I like it.

## Instructions to run:
- Download the repo to your local machine and copy/paste the local HTML file path in your favorite browser. Enjoy!
- This is NOT a mobile app.
