const token = 'e9a529e01acdf94252c971ed2eace29b1bca402851e7a072f898d6214082edb9d18c5f925839f0b5815ed2dab529667ccbe04f4bac38b229c715d42d6b263cc9084431ce2a2f2a6ef75ee269131c9b4051d59091814164f242b242af1fe4545d5c5161171446b4451e5698f68629f9335c6ad58282de3b7ab103280bc5c47f98';

fetch('https://aieien-backend.onrender.com/api/heroes?populate=*', {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(json => {
    console.log('--- Current Hero API Response from Render Backend ---');
    console.log(JSON.stringify(json, null, 2));
  })
  .catch(console.error);
