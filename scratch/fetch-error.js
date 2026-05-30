// Use global fetch
fetch('http://localhost:3000/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'ini dokumen percobaan untuk analisis', type: 'persidangan' })
}).then(res => res.text()).then(text => {
  const match = text.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/);
  if (match) {
     const data = JSON.parse(match[1]);
     console.log(data.err.message);
     console.log(data.err.stack);
  } else {
     console.log('No next data found', text.substring(0, 500));
  }
}).catch(console.error);
