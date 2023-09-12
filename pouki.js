const express = require('express');
const app = express();
const PORT = 3005;
const cors = require('cors');
const fs = require('fs'); // Ajout de la bibliothèque de gestion des fichiers

let pageLoadCount = 0;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
   pageLoadCount++;
   console.log(`Page chargée - Total : ${pageLoadCount}`);
   
   // Enregistrez le nombre de chargements dans un fichier journal
   fs.appendFileSync('chargements.log', `Page chargée - Total : ${pageLoadCount}\n`);

   next();
});

app.get('/track', (req, res) => {
   const pageUrl = req.query.url;
   const referrer = req.query.referrer;

   res.header('Access-Control-Allow-Origin', '*');
   res.status(200).json({
      totalPageLoads: pageLoadCount,
      currentPageUrl: pageUrl,
      referrerUrl: referrer
   });
});

// Ajout de la route /stats pour récupérer le nombre total de chargements
app.get('/stats', (req, res) => {
   res.status(200).json({
      totalPageLoads: pageLoadCount
   });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
