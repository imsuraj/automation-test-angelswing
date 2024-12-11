const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  video: true,
  e2e: {
    baseUrl: 'https://www.amazon.com/',
    setupNodeEvents(on, config) {
      on("task", {
        // Task to read the last selected option
        readLastSelectedOption() {
          const filePath = path.resolve("lastSelectedOption.json");
          if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
          }
          return null;
        },
        // Task to write the selected option
        writeLastSelectedOption(option) {
          const filePath = path.resolve("lastSelectedOption.json");
          fs.writeFileSync(filePath, JSON.stringify({ lastSelectedOption: option }));
          return null;
        },
      });
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
