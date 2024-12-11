describe('Amazon Department Selection with Unique Selection', () => {

    // number of retry attempts
    const retryAttempts = 3;
    // initialize previous selection value
    let previousSelection = '';

    before(() => {
        // get the last selected option
        cy.task('readLastSelectedOption').then((data) => {
            previousSelection = data ? data.lastSelectedOption : '';
            cy.log(`Previously selected option: ${previousSelection}`);
        });
    });

    function selectDepartment(attempt = 1) {
        // log the current attempt
        cy.log(`Attempt: ${attempt}`);

        // navigate to the Amazon home page
        cy.visit('/');

        // wait for the dropdown element to appear
        cy.get('body').then((body) => {
            if (body.find('#nav-search-label-id').length > 0) {
                cy.get('#nav-search-label-id', { timeout: 15000 })
                    .should('be.visible')
                    .click({ force: true });
            } else if (attempt < retryAttempts) {

                // if element is not found, reload and retry
                cy.log('Element not found. Retrying...');
                cy.reload();
                selectDepartment(attempt + 1);
            } else {
                throw new Error('Failed to find and click #nav-search-label-id after retries');
            }
        });
    }

    it('should select a different department each time', () => {
        // retry logic wrapped in a function
        selectDepartment();

        // get all available options in the dropdown
        cy.get('#searchDropdownBox option', { timeout: 15000 }).then((options) => {
            const optionCount = options.length;

            // ensure there are options available
            expect(optionCount).to.be.greaterThan(1);

            // create an array of options excluding the previous selection
            const validOptions = Array.from(options).filter((option) => option.text !== previousSelection);

            // generate a random index for option selection from the filtered list
            const randomIndex = Math.floor(Math.random() * validOptions.length);

            // select the option by its text
            const selectedOption = validOptions[randomIndex].text;
            cy.get('#searchDropdownBox').select(selectedOption, { force: true });

            cy.wait(5000);

            // verify the selected option
            cy.get('#searchDropdownBox option:selected')
                .should('have.text', selectedOption)
                .then(() => {
                    cy.log(`Selected option: ${selectedOption}`);

                    // save the selected option for the next run
                    cy.task('writeLastSelectedOption', selectedOption);
                });
        });
    });
});
