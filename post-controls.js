// Attempt to separate the post form controls from the main index.js file
import { renderPage } from "./renderPage.js"; // Assuming renderPage is in a separate file
import { postTitles, postTimestamps, postTexts } from "./data.js";

function registerPostRoutes(app) {

    //Creating a new post

    app.post("/submit", (req, res) => {
        let currentPostTitle = req.body["newPostTitle"];
        let currentPostTimestamp = req.body["localTimestamp"];
        let currentPostBody = req.body["newPostText"];
        //Establish variables to represent new Post Title and Text parsed from forms from index.ejs
        postTitles.push(currentPostTitle);
        postTexts.push(currentPostBody);
        postTimestamps.push(currentPostTimestamp);
        //Adds new Post Title, Timestamp and Text to respective arrays
        console.log("Post Saved: " + currentPostTitle);
        renderPage(res, "index.ejs");
        //Re-renders index.js to update blog entires
    });

    //Editing a selected post

    app.get("/edit", (req, res) => {
        const postIndex = parseInt(req.query.postIndex); // Get the post index from the query parameter
        if (postIndex === undefined || postIndex < 0 || postIndex >= postTitles.length) {
            return res.status(400).send("Invalid post index");
        }
        console.log("Edit Post Selected: " + postTitles[postIndex]);
        // Validate the postIndex to ensure it's a valid index in the postTitles array
        // If the postIndex is not valid, return a 400 Bad Request response
        // If the postIndex is valid, proceed to render the edit form
        // This will allow the user to edit the post title and text in the form fields
        renderPage(res, "posts.ejs", {
            editPost: true,
            oldTitle: postTitles[postIndex],
            oldText: postTexts[postIndex],
            postIndex
        });
        // Render the index.ejs with editPost set to true, and pass the old title and text
        // to the template so they can be displayed in the form for editing.
        // This will allow the user to see the current post title and text in the form fields
    });

    app.post("/post-action", (req, res) => {
        const action = req.body.action; // Get the action from the form data
        const postIndex = parseInt(req.body.postIndex); // Get the post index from the form data

        switch (action) {

            // Saving the edited post

            case "save": {
                const newTitle = req.body.editPostTitle;
                const newTimestamp = req.body.localTimestamp;
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
                renderPage(res, "index.ejs", {
                    editPost: false
                });
                break;
            }

            // Deleting the selected post

            // Add a confirm() here at some point

            case "delete": {
                if (postIndex === undefined || postIndex < 0 || postIndex >= postTitles.length) {
                    return res.status(400).send("Invalid post index");
                }
                // Validate the postIndex to ensure it's a valid index in the postTitles array
                // If the postIndex is not valid, return a 400 Bad Request response
                console.log("Delete Selected: " + postTitles[postIndex]);
                postTitles.splice(postIndex, 1);
                postTexts.splice(postIndex, 1);
                postTimestamps.splice(postIndex, 1);
                console.log("Post Deleted");
                // Remove the post from the arrays using splice
                renderPage(res, "index.ejs");
                // Re-render the index.ejs to update the blog entries
                break;
            }
            default:
                return res.status(400).send("Invalid action");
        }
    });

};

export default registerPostRoutes;