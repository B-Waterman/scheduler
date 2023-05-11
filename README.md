# Interview Scheduler

## Project Summary
Interview Scheduler is a SPA (Single Page Application) where you can create, edit, and track student interviews.

### View the weekly schedule!
!["Interview Schedule"](https://github.com/B-Waterman/scheduler/blob/master/docs/InterviewSchedule.png?raw=true)

### Book an interview of your own!
!["Book an interview"](https://github.com/B-Waterman/scheduler/blob/master/docs/BookInterview.png?raw=true)

### Edit existing interviews!
!["Edit Interiew"](https://github.com/B-Waterman/scheduler/blob/master/docs/EditInterview.png?raw=true)

### A confirmation request will be made ahead of deletion!
!["Delete Confirm"](https://github.com/B-Waterman/scheduler/blob/master/docs/DeleteInterview.png?raw=true)

---

## Setup

Clone this repository with
```sh
git clone git@github.com:B-Waterman/scheduler.git
```

This project utilises an API server found [here](https://github.com/B-Waterman/scheduler-api). Please clone this repository and follow the setup instructions found in the README.

Install dependencies with `npm install`.

## Project Dependencies
* axios: "^0.20.0"
* classnames: "^2.2.6"
* normalize.css: "^8.0.1"
* react: "^16.9.0"
* react-dom: "^16.9.0"
* react-script: "3.4.4"
* sass: "^1.53.0"

---

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
