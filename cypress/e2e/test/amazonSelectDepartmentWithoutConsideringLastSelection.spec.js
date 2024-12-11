describe('Amazon Department Selection with Retry', () => {
    const retryAttempts = 3; // Number of retry attempts

    function selectDepartment(attempt = 1) {
        // log the current attempt
        cy.log(`Attempt: ${attempt}`);

        // Step 1: navigate to the Amazon home page
        cy.visit('/');

        // Step 2: wait for the dropdown element to appear
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

    it('should select a random department', () => {
        // retry logic wrapped in a function
        selectDepartment();

        // Step 3: get all available options in the dropdown
        cy.get('#searchDropdownBox option', { timeout: 15000 }).then((options) => {
            const optionCount = options.length;


            // Step 4:  ensure there are options available
            expect(optionCount).to.be.greaterThan(1);

            // Step 5: generate a random index for option selection
            const randomIndex = Math.floor(Math.random() * optionCount);

            // Step 6: select the option by its text
            const optionText = options[randomIndex].text;
            cy.get('#searchDropdownBox').select(optionText, { force: true });

            // Step 7: verify the selected option
            cy.get('#searchDropdownBox option:selected')
                .should('have.text', optionText)
                .then(() => {
                    cy.log(`Selected option: ${optionText}`);
                });
        });
    });
});
