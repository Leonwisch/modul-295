function greifeAufDatenbankZu(query) {
    return new Promise((resolve, reject) => {
      // Datenbankzugriff simulieren
      setTimeout(() => {
        const ergebnis = 'Datenbankergebnis: ' + query;
        resolve(ergebnis);
      }, 1000);
    });
  }
  
  async function verarbeiteDatenbankanfrage() {
    try {
      const ergebnis = await greifeAufDatenbankZu('SELECT * FROM users');
      console.log(ergebnis);
    } catch (err) {
      console.error('Fehler beim Datenbankzugriff:', err);
    }
  }
  
  verarbeiteDatenbankanfrage();