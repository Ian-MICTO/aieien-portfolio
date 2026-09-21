const https = require('https');

fetch('https://aieien-frontend.onrender.com')
  .then(res => res.text())
  .then(html => {
    console.log('HTML Total Length:', html.length);
    const start = html.indexOf('<section id="home"');
    if (start !== -1) {
      const end = html.indexOf('</section>', start);
      console.log('--- Home Section HTML ---');
      console.log(html.substring(start, end + 10));
    } else {
      console.log('Home section not found in HTML.');
    }
  })
  .catch(console.error);
