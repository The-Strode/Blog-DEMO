import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Funtion to handle reloading index.ejs with updated posts and texts

function renderIndex(res, options = {}) {
    res.render("index.ejs", {
        editPost: options.editPost || false,
        oldTitle: options.oldTitle || "",
        oldText: options.oldText || "",
        postIndex: options.postIndex,
        posts: postTitles,
        timestamps: postTimestamps,
        texts: postTexts,
        // Pass the postTitles, postTimestamps, and postTexts arrays to the template
        // This will allow the template to access the arrays and display the posts
    });
}

//Render website on initial load

app.get("/", (req, res) => {
    renderIndex(res);
})

// Render account page

app.get("/account", (req, res) => {
    res.render("account.ejs");
});

//Creating a new post

app.post("/submit", (req, res) => {
    let currentPostTitle = req.body["newPostTitle"];
    let currentPostTimestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    let currentPostBody = req.body["newPostText"];
    //Establish variables to represent new Post Title and Text parsed from forms from index.ejs
    postTitles.push(currentPostTitle);
    postTexts.push(currentPostBody);
    postTimestamps.push(currentPostTimestamp);
    //Adds new Post Title, Timestamp and Text to respective arrays
    console.log("Post Saved: " + currentPostTitle);
    renderIndex(res)
    //Re-renders index.js to update blog entires
});

//Editing a selected post

app.get("/edit", (req, res) => {
    const postIndex = req.query.postIndex; // Get the post index from the query parameter
    const editTitle = postTitles[postIndex];
    const editText = postTexts[postIndex];
    if (postIndex === undefined || postIndex < 0 || postIndex >= postTitles.length) {
        return res.status(400).send("Invalid post index");
    }
    console.log("Edit Post Selected");
    console.log("Post Title: " + editTitle);
    console.log("Post Text: " + editText);
    // Validate the postIndex to ensure it's a valid index in the postTitles array
    // If the postIndex is not valid, return a 400 Bad Request response
    // If the postIndex is valid, proceed to render the edit form
    // This will allow the user to edit the post title and text in the form fields
    renderIndex(res, {
        editPost: true,
        oldTitle: postTitles[postIndex],
        oldText: postTexts[postIndex],
        postIndex
    });
    // Render the index.ejs with editPost set to true, and pass the old title and text
    // to the template so they can be displayed in the form for editing.
    // This will allow the user to see the current post title and text in the form fields
});

// Saving the edited post

app.post("/save", (req, res) => {
    const postIndex = parseInt(req.body.postIndex);
    const newTitle = req.body.editPostTitle;
    const newTimestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const newText = req.body.editPostText;
    // Get the post index from the form data
    // Get the new title and text from the form data
    if (isNaN(postIndex) || postIndex < 0 || postIndex >= postTitles.length) {
        return res.status(400).send("Invalid post index");
    }
    // Validate the postIndex to ensure it's a valid index in the postTitles array
    // If the postIndex is not valid, return a 400 Bad Request response
    postTitles[postIndex] = newTitle;
    postTimestamps[postIndex] = newTimestamp;
    postTexts[postIndex] = newText;
    // Overwrite the array elements
    console.log("Edits Saved");
    renderIndex(res);
    // Re-render the index.ejs to update the blog entries with the edited post
});

// Deleting a selected post

app.post("/delete", (req, res) => {
    const postIndex = parseInt(req.body.postIndex);
    // Get the post index from the query parameter
    if (postIndex === undefined || postIndex < 0 || postIndex >= postTitles.length) {
        return res.status(400).send("Invalid post index");
    }
    // Validate the postIndex to ensure it's a valid index in the postTitles array
    // If the postIndex is not valid, return a 400 Bad Request response
    console.log("Delete Selected: " + postTitles[postIndex]);
    postTitles.splice(postIndex, 1);
    postTexts.splice(postIndex, 1);
    console.log("Post Deleted");
    // Remove the post from the arrays using splice
    renderIndex(res);
    // Re-render the index.ejs to update the blog entries
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Below - Arrays containing Post Titles, Timestamps, and Texts, including examples to showcase on load
// Eventually these will be replaced with a database to store posts
// For now, they are hardcoded for simplicity and demonstration purposes

var postTitles = [
    "Post One",
    "Post Two",
];

var postTimestamps = [
    "2023-10-01 12:00",
    "2023-10-02 14:30",
];

var postTexts = [
    "This is example post Number 1",
    "And this is the second example",
];

// Ideas for future improvements and features:
// 1. Implement a database to store posts instead of using arrays.
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