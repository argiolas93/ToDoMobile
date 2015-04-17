#ToDoMobile
>Functional analysis of different frameworks for developing web applications on mobile devices.

##What is it?
Taking inspiration from [TodoMVC example](http://todomvc.com/), I analyzed the main frameworks for developing applications on mobile devices, taking into cosideration:

  * The functional part, JavaScript, with which it controls the operation of an application.
  * The User Interface, CSS-HTML, provide by each framework.
  
This analysis may provide an important starting point for choosing which framework to use to develop a particular application.

##Framework Analysis
The Main purpose of the analysis is to understand the best way to develop a Cross-Plaform application for most mobile operating systems.
The solution to be developed, therefore, will depend on:

  * The structure that provides the framework, ie the user interface and the fidelity of that interface.
  * The functional component, or the technologies that allow a real implementation of all the features like the ones found on native mobile applications.

In order to get a more complete analysis possible, we start from the general description of a web application, then we switch to the structure of an Cross-Platform Application for mobile devices, which will use the previous web application, and concludes by introducing different frameworks that allow the passage from the first Web App to the final Mobile Web App.

###Web Application Architecture(Client Side)
First, we start by describing the structure of a normal application for the web.
![alt tag](/Other/img/WebApp.jpg)

  * **HTML**: Describe the structure of a web page.
  * **CSS** : Describe the User Interface style applied at all element in the HTML structure.
  * **JS**  : Specify the functions and make the HTML structure dinamic, allowing the control over the elements.
  
###Cross-Platform Mobile Application Architecture(Client Side)
Before starting devolopment, we must consider the following structure:
![alt tag](/Other/img/WebAppMob.jpg)

  * **HTML**:        In this case, we can specify only the elements supported by the mobile devices.
  * **CSS** :        With the CSS, we want to reproduce as possible is, the User Interface and style of a native application.
  * **JS**  :        In the Cross-Platform development provide:
   * Control over the HTML elements.
   * Provide interactions between CSS and HTML.
   * It may access to native APIs of each mobile OS.
                        
  * **Webview** :    A view that displays web pages. It uses the WebKit rendering engine to display web pages and includes methods to navigate forward and backward through a history, and other good stuffs.
  * **Wrapper** :    Allow the conversion by the mobile application to a native application, if necessary by making the connection between JS and APIs.

###Frameworks
To develop and analyze a Cross-Platform Mobile application, we need to use 3 level:

  * **Design**    : HTML+CSS        - Structure elements with a specific OS design.
  * **Control**   : JavaScript      - Functional code to allow control over Design and with OS APIs.
  * **Wrapper**   : Webview+Wrapper - Functionality and Tools to convert and use the Apps on mobile devices.
  
###Frameworks - Technologies

|                |jQuery|AngularJS|Dom $$|Own JS|
|----------------|:----:|:-------:|:----:|:----:|
|AngularMaterial |      |X        |      |      |
|ChocolateChip UI|X     |         |      |X     |
|Framework7      |      |         |X     |      |
|Ionic           |      |X        |      |      |
|Ratchet         |      |         |      |      |

###Frameworks - Design OS

|                |Android    |iOS  |Windows Phone|
|----------------|:---------:|:---:|:-----------:|
|AngularMaterial |Material   |     |             |
|ChocolateChip UI|4          |7    |8            |
|Framework7      |           |7    |             |
|Ionic           |           |7    |             |
|Ratchet         |4          |7    |             |

###Frameworks - Browser Compatibility
|                |Android    | IOS |Windows Phone|Firefox OS   |Chrome       |Firefox      |Safari       |Opera        |IE           |
|----------------|:---------:|:---:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
|AngularMaterial |n-1        |n-1  |n-1          |n-1          |n-1          |n-1          |n-1          |n-1          |n-1          |
|ChocolateChip UI|           |     |             |             |             |             |             |             |             |
|Framework7      |           |     |             |             |             |             |             |             |             |
|Ionic           |4.1+       |7+   |RoadMap      |RoadMap      |No Guarantee |No Guarantee |No Guarantee |No Guarantee |No Guarantee |
|Ratchet         |           |     |             |             |             |             |             |             |             |
(*n is the attual browser versions.)

  * [AngularMaterial](https://github.com/angular/material)
  * [Ionic](http://ionicframework.com/docs/overview/#browser-support)
  * [Framework7](https://github.com/angular/material/blob/master/CHANGELOG.md)

##Web Application ToDoMobile
The application is a basic Todo, inspired by [TodoMVC example](http://todomvc.com/), with these functions:

  * Add todos in the list.
  * Remove a single todo from the list.
  * Select todos completed and delete all.
  * Save all todos. (By [localStorage](http://www.w3schools.com/html/html5_webstorage.asp))
  
##Cordova/Phonegap
All the project are Apache Cordova based, it allow the developer to convert each web application in a mobile application.
All applications are developed with different frameworks and all the project have the android platform installed to test it on the device.
To use a Apache Cordova project is useful read the [documentation](http://cordova.apache.org/docs/en/4.0.0/).

##Frameworks
  * [AngularMaterial](https://material.angularjs.org/)
  * [ChocolateChip UI](http://chocolatechip-ui.com/)
  * [Framework7](http://www.idangero.us/framework7/)
  * [Ionic](http://ionicframework.com/)
  * [Ratchet](http://goratchet.com/)
