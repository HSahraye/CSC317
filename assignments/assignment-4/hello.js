// hello.js
const greeting = "JavaScript";

const createMessage = (name) => {
    return `Hello, ${name}!`;
};

// Using template literals and arrow function
const displayMessage = () => {
    const message = createMessage(greeting);
    console.log(message);
    return message;
};

// Export the function for use in HTML
module.exports = { createMessage, displayMessage };

// Run the function when executed directly
if (require.main === module) {
    displayMessage();
} 