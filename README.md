# Assessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## ASSUMPTIONS

On analyzing the data I decided to keep a 1 hour time slot to populate the data accordingly in the table. So I assume that if the data changes in any way it would have the same pattern for time periods.
Only values for dates which are present in the mock data would be editable.
As we are using mock data and the updated values are not being saved anywhere so on reloading the page all the updates will be reversed.

## FUNCTIONALITIES

Click on the Edit button to edit any value in the table. Background color for the fields editable would be changed. 
After editing the table click on the Submit button and a dialog box would open up showing all the edited fields with the previous value, updated value, date representing that column and the time slot for that field.
I’ve added pagination so data for one week would be shown at a time and to move to the next week we just need to move to the next page on our paginator.

## Code Structure

Used Modular approach to implement lazy loading. (thought for a single component this wasn’t required but to show the best practices I added it)
Created interfaces for type specification.
Kept components which could be used all over the app in a shared folder.

## TECH STACKS

Angular v16.2.0 
Angular material v16.2.1


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
