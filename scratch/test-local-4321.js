fetch('http://localhost:4321')
  .then(res => res.text())
  .then(html => {
    console.log('--- Checking localhost:4321 output ---');
    console.log('HTML Length:', html.length);
    const hasAbout = html.includes('About');
    const hasWorks = html.includes('Works');
    const hasStyle = html.includes('Style');
    const hasConnect = html.includes('Connect');
    const hasInfo = html.includes('Info');
    const hasNoSections = html.includes('No sections currently enabled');
    
    console.log('Has About:', hasAbout);
    console.log('Has Works:', hasWorks);
    console.log('Has Style:', hasStyle);
    console.log('Has Connect:', hasConnect);
    console.log('Has Info:', hasInfo);
    console.log('Has "No sections currently enabled":', hasNoSections);
  })
  .catch(console.error);
