async function test() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxmmzhboID5Gi6vvpbGJLdg1pwEOf9-QG-jRtv8TeC9Kd-4kXJWH5cXu97Nbxlt2E1E/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'action=get&entity=siswa'
    });
    const text = await response.text();
    console.log("--- RAW RESPONSE ---");
    console.log(text);
    console.log("--- END ---");
  } catch (e) {
    console.error(e);
  }
}
test();
