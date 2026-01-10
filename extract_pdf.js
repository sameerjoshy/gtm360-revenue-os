const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('design_assets/website copy and layout .pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error){
    console.error(error);
});
