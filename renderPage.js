import { postTitles, postTimestamps, postTexts } from './data.js';

export function renderPage(res, template, options = {}) {
    res.render(template, {
        // Common data for all pages
        posts: postTitles,
        timestamps: postTimestamps,
        texts: postTexts,
        // Page-specific controls
        ...options
    });
}
