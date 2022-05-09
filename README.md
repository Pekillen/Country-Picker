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

The Project contains a React Application and its components. The purpose of the project was to create an Application that would:
- Be easily reusable
- Have intuitive UI
- Have clean code 

This application was created using Material UI to provide clean and easy-to-understand UI, but foremost to make the app responsive. Except for Material UI, no other library was used. Other libraries were avoided to make the components as independent and easy to implement, as possible. For the same reason all components are located in the "CountryPicker" folder - the idea was to highlight the reusability of the component.

### Logic 

The app consumes API receiving a JSON object containing information about countries of the world. This data is then spread out across an array and set as an initial state for the useState() hook in React. Each object in the array receives a property "checked" to track whether it was checked by the user. 
Users may interact with data thanks to UI and easily select countries of choice. Once countries are chosen, users are transferred (sic! The best practice would be to use Router in the application and to separate the code into a bigger number of child components, but in this project these practices were omitted to keep the component robust and reusable, therefore, after clicking the button simply another component is rerendered) to a confirmation page, where the user has chosen countries displayed and can confirm the choice or go back.

### Process 

Before starting this app some basic principles for this app were determined; I decided that I want to use as few libraries as reasonable, so the components can work straight out of the box. Secondly, I decided that one library I am going to use going to be MUI, due to its flexibility and responsiveness. Then I created a simple skeleton for the app; fetching the data, and deciding to keep the entire JSON object as a single state parameter. This decision was made based on assumption that this way the code will stay readable and easy to understand. After that, I created basic JSX components to display the data. Nextly, filters were implemented to manipulate the data. After that I steadily increased the complexity of the application, adding new methods, and components, testing the app at each step, and re-styling the app so that it stays easy to understand.
