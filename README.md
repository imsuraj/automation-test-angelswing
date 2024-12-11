# Amazon Department Selection Tests

This repository contains Cypress tests for selecting departments from the Amazon website. It includes two variations of the test for selecting a department from the dropdown menu:
- **amazonSelectDepartment.spec.js**: Selects a department randomly while ensuring that the previous department is not selected again.
- **amazonSelectDepartmentWithoutConsideringLastSelection.spec.js**: Selects a department randomly without considering the previously selected department.

## Project Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn (for installing dependencies)
- Cypress (installed as a project dependency)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/imsuraj/automation-test-angelswing.git
   cd automation-test-angelswing
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

### Configuration

#### cypress.config.js

The `cypress.config.js` file contains the base URL for Amazon's website and defines custom tasks to read and write the last selected department. It uses a JSON file (`lastSelectedOption.json`) to store the last selected option so that the tests can pick a unique department in subsequent runs.

### Custom Cypress Tasks

- **readLastSelectedOption**: Reads the `lastSelectedOption.json` file to get the department selected in the last test run.
- **writeLastSelectedOption**: Writes the currently selected department to the `lastSelectedOption.json` file to use it in the next test run.

### Folder Structure

- `cypress/`
  - `e2e/test/` - Contains the test files.
    - `amazonSelectDepartment.spec.js` - Test file for selecting a department with unique selection.
    - `amazonSelectDepartmentWithoutConsideringLastSelection.spec.js` - Test file for selecting a department without considering the last selection.
- `cypress.config.js` - Cypress configuration file.
- `lastSelectedOption.json` - Stores the previously selected department for unique department selection.

---

## Tests

### 1. **amazonSelectDepartment.spec.js**

This test selects a department randomly but ensures that the previously selected department is not chosen again.

#### Workflow:
1. The test navigates to the Amazon homepage.
2. It waits for the dropdown menu to appear and clicks it to open the department options.
3. The test fetches all available department options and filters out the department previously selected.
4. A random department (other than the previous one) is selected.
5. The selected department is logged and saved to `lastSelectedOption.json` for future test runs.

#### Retry Logic:
- If the dropdown is not found on the first attempt, the test will automatically retry up to three times before failing.

### 2. **amazonSelectDepartmentWithoutConsideringLastSelection.spec.js**

This test selects a department randomly without considering the last selected department.

#### Workflow:
1. The test navigates to the Amazon homepage.
2. It waits for the dropdown to appear and clicks it to open the department options.
3. A random department is selected from all available options.
4. The selected department is logged, but the previous selection is not considered.

#### Retry Logic:
- Similar to the first test, if the dropdown is not found on the first attempt, it will retry up to three times.

---

## Running the Tests

### Running Tests with Cypress

To run the tests locally, follow these steps:

1. Open a terminal and navigate to your project directory.
2. Run Cypress in interactive mode:
   ```bash
   npx cypress open
   ```
   This will launch the Cypress Test Runner, where you can select and run the tests.

3. To run the tests headlessly (without the Test Runner UI), you can use:
   ```bash
   npx cypress run
   ```

### Tasks and State Management

- The test uses Cypress **tasks** to read and write the last selected department to a file (`lastSelectedOption.json`) to maintain state across test runs.
- These tasks are handled in `cypress.config.js`, where we read and write JSON data using Node.js' `fs` module.

