# The Country-Picker App

This project was created as a coding assignment for Bouvet ASA. 
The task was created enitrely by Piotr Kwiatkowski.

## Build locally

To build and run the app locally on your machine you need to:

- Get the code on your local device 
- Open the folder containing the code
- Run `npm install` and then `npm start` using terminal or command line

This will allow you to run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Purpose

The Project contains a React Application with components. The purpose of the project was to create an Application that would:
- Be easily reusable
- Have intuitive UI
- Have clean code 

This application was created using Material UI to provide clean and easy-to-understand UI, but foremost to make the app responsive. Except for Material UI, no other library was used. Other libraries were avoided to make the components as independent and easy to implement, as possible. For the same reason all components are located in the "CountryPicker" folder - the idea was to be able to take this folder and to be able to inject this into any app that would require this.

### Logic 

The app consumes API receiving a JSON object containing information about countries of the world. This data is then spread out across an array and set as an initial state for the useState() hook in React. Each object in the array receives a property "checked" to track whether it was checked by the user. 
Users may interact with data thanks to UI and easily select countries of choice. Once countries are chosen, users are transferred (sic! Best practice would be to use Router in the application, but since the component is relatively small and barely any libraries are used in this app, after clicking the button simply another component is rerendered) to a confirmation page, where a user has chosen countries displayed and can confirm the choice or go back and reconsider the choice. 

### Process 

Before starting this app some basic principles for this app were determined; I decided that I want to use as few libraries as reasonable, so the components can work straight out of the box. Secondly, I decided that one library I am going to use going to be MUI, due to its flexibility and responsiveness. Then I created a simple skeleton for the app; fetching the data, and deciding to keep the entire JSON object as a single state parameter. This decision was made based on assumption that this way the code will stay readable and easy to understand. After that, I created basic JSX components to display the data. Nextly, filters were implemented to manipulate the data. After that I steadily increased the complexity of the application, adding new methods, and components, testing the app at each step, and re-styling the app, so that it stays easy to understand.
