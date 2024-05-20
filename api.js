const axios = require('axios');
const cheerio = require('cheerio');

async function courseList(url = 'https://s174-254.apntelecom.com/learn/Web-Development/') {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const courses = [];
        $('a').each((i, elem) => {
            if(i > 4) {
                courses.push({
                    "href": $(elem).attr('href'),
                    "title": $(elem).text(),
                });
            }
        });

        return courses;
    } catch (error) {
        console.error(`Error fetching the URL: ${error}`);
        return [];
    }
}

async function courseSection(url = '') {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const courses = [];
        $('a').each((i, elem) => {
            if(i > 4) {
                courses.push({
                    "href": $(elem).attr('href'),
                    "title": $(elem).text(),
                });
            }
        });

        return courses;
    } catch (error) {
        console.error(`Error fetching the URL: ${error}`);
        return [];
    }
}

async function courseVideos(url = '') {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const courses = [];
        $('a').each((i, elem) => {
            const href = $(elem).attr('href');
            const title = $(elem).text();

            // Check if the href ends with .mp4
            if (href.endsWith('.mp4')) {
                if(i > 4) {
                    courses.push({
                        "href": href,
                        "title":title,
                    });
                }
            }
        });

        return courses;
    } catch (error) {
        console.error(`Error fetching the URL: ${error}`);
        return [];
    }
}


module.exports = {courseList, courseSection, courseVideos};