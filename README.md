# Programming Exercise: Device Manager App
The problem statement is defined here: https://sites.google.com/a/nyansa.com/nyansa-programming-exercise-angular/

## Running my solution
My solution is a React app. To run:

1. `cd` to the root of this repo.
2. `npm install`
3. `npm start`
4. Point a browser at http://localhost:3000/

## Organization of Source Code
The following is an abbreviated listing of the files and folders in the project:
* **public/** -- top-level index.html and styles.css live here. These should look familiar, a lot like the top-level files found in the original AngularJS project
* **src/** -- app code lives here
  * **components/** -- Everything in here is a re-usable React component
    * **DeviceDashboard.js -- The top-level Devices Dashboard.** This should look familiar to the baseline AngularJS `src/app/dashboard` component. READ ME!
    * **HotDevicesPanel.js -- The new "Top 5" panel component.** READ ME!
  * **resources/** -- Equivalent to `src/app/common/resources` from the AngularJS project. I would typically call this "Services".
    * Devices.js -- The device listing service.
  * **shared/** -- Functions to be shared throughout the app
    * Formatting.js -- A static utility class equivalent to `src/app/common/filters/formatting.js` from the AngularJS project 
* **index.js** -- Lights up the top-level React element in index.html in the DOM. 
     

## Implementation Notes

Below are my notes on implementation details.

* I believe that my solution hits all the stated requirements. You should see four "Top 5 Devices" Panels at the top of the Device Manager dashboard, each showing the correct data.

* I wanted to feel how the live UI would actually behave with live data, so I augmented the Devices service to continuously update values every few seconds. This wasn't required, but was useful for determining how to implement the Owner name updates.

* You can click on **Owner** name, both in the **Top 5** panels and in the **All Devices** list, to enter a new value. The updated value gets "saved" back to the Devices service, and the updated Devices list then projects through to all views in the app.
  * I chose a pop-up modal as the mechanism to capture the new Owner value (rather than an edit-in-place widget), because as the values update periodically, it would be jarring for the user if the location for input changed (or, worse yet, the line might disappear from the Top 5 list entirely) while the user was trying to type.
  
* I implemented a "threshold" comparison on the **Top 5** panel, so that devices over a certain threshold value will be highlighted in red.

* I noticed that Bootstrap is used in the app, which I assumed to be a deliberate design choice, so I decided to stick with Bootstrap and take advantage of its built-in components and styling variants. The **Top 5** panels use the Bootstrap **Panel** component. Aesthetically, Bootstrap and its built-in styles aren't the sexiest choice, but sticking with Bootstrap **does** presumably keep the **Top 5** panels in consistent style with the rest of the app. 
  
* I chose to break away from the original AngularJS code and simply re-do it in React. Here's my reasoning:
  * I actually set out to stick with AngularJS, to remain consistent with the established code. However, the AngularJS version specified in package.json is very old, predating the version I used heavily in 2015, with some significant usage differences. (I have used Angular 2+ from 2016 onward, btw.) These differences frustrated my progress early on. 
  * I have been wanting to use React more to freshen up my experience with it, and it seems like the clear choice for modern framework for a small dashboard app like this.
  * I found a recipe to integrate a react components into an AngularJS JS app. I evaluated this approach, assuming that in the real world, I wouldn't have the luxury to rewrite the baseline app. However, the wiring for the AngularJS-React integration was complex, and not easy to grasp a glance. I didn't want to submit for judging a tangle of hard-to-read wiring as my solution.
  * After weighing my options, I decided to go with React entirely, and reproduce the original functionality rather than try to extend it or bolt onto it. 


## TODOs, Improvements, Next Steps

* The meaning of the highlighting for devices over their threshold isn't immediately clear. I didn't have time to address the issue, but I imagined a tooltip or help icon on the over-threshold lines, which would reveal descriptive help-text.

* I have experience with both React and Bootstrap, but never together. There appear to be some gotchas around importing bootstrap modules into React code. My quick-and-dirty solution to avoid lengthy research further is to import the minimized bootstrap files from a CDN directly in index.html. This probably isn't the recommended method, but it works for now and I left it.

* I stuck with Bootstrap for better or for worse, but I fear "for worse". Aesthetically, if I were to re-do the exercise I would break away from Bootstrap to get a less-vanilla feel.
  * Incidentally, simply upgrading to Bootstrap 4.x would be an immediate visual boost for the app. (Just point to the later CDN.) I assumed Bootstrap 3 is a dependency for a reason, so I left it as-is.

* The wrapping in the narrow panel columns can get a bit wonky. When lines wrap differently, it causes the overall height of the separate panels to diverge. I'd like to address that UI issue so that the panels are always the same height relative to one-another.

* In terms of responsiveness, the small and large CSS breakpoints both look OK, but there is a medium-size point that behaves poorly, which should get addressed.
