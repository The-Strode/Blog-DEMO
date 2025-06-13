import express from "express";
import bodyParser from "body-parser";
import registerPostRoutes from "./post-controls.js";
import { postTitles, postTimestamps, postTexts } from "./data.js";
import { renderPage } from "./renderPage.js"; // Assuming renderPage is in a separate file

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

registerPostRoutes(app);

app.get("/", (req, res) => {
    renderPage(res, "index.ejs");
});

app.get("/account", (req, res) => {
    renderPage(res, "account.ejs")
});

app.get("/posts", (req, res) => {
    renderPage(res, "posts.ejs")
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Ideas for future improvements and features:
// 1. Implement a database to store posts instead of using arrays. Temporarily examples housed in a data.js file
// 2. Add user authentication to allow users to create accounts and manage their posts.
// 3. Implement a comment system for each post, allowing users to leave feedback.
// 4. Add pagination to the blog to display a limited number of posts per page.
// 5. Create a tagging system to categorize posts, making it easier for users to find related content.
// 6. Implement a rich text editor for creating and editing posts, allowing for formatting options like bold, italics, and lists.
// 7. Add a feature to upload images or files with posts, enhancing the content.
// 8. Create an admin panel for managing posts, users, and comments.
// 9. Implement a search functionality to find posts by keywords or tags.
// 10. Add a feature to allow users to like or favorite posts, creating a more interactive experience.

// This is a big one: Change the structure to have a consistent header and load the body and footer as partials.
// Then attempt to implement an audio player in the header that is uninterrupted by page loads.
// This represents a main goal in future endeavors, as it will allow for a more dynamic and user-friendly experience
// when building websites for musicians and artists in mind.

// The above "big one" will require a significant refactor of the current codebase. Further education required
// in the use of React.js or similar frameworks to achieve this goal - Single Page Application (SPA) functionality.

// Some AI tools were used to achieve this code, including OpenAI's ChatGPT for generating code snippets and explanations.
// Mostly just the explanations of certain concepts to be honest, outside of one or two snippets.
// That and filling out some of these comments to make them more readable and understandable.
// Because why the hell not, right? That crap can get boring quick. I wanna code, not write comments.