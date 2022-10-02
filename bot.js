// Poruka koja se ispiše u cmd nakon što se u istom pokrene "node bot.js":
console.log('Bot se pokreće.');

// Kako ne bi bila vidljiva u kodu, Tviter autorizacija se nalazi u zasebnom fajlu "config.js":
var config = require('./config');

// Tviter API klijent za Node.js:
var Twit = require('twit');

// Prosledi konfiguraciju Tviter aplikacije iz config.js fajla Twit-u:
var T = new Twit(config);

// Traži tvitove na osnovu upita 'q' u params:
var retweet = function() {
    var params = {
        q: '(favorite OR favourite) game screenshot filter:images'
    }
    // Preuzmi tvitove:
    T.get('search/tweets', params, function(err, data) {
      // Ukoliko nema grešaka:
        if (!err) {
          // preuzmi ID tvita za retvit:
            var retweetId = data.statuses[0].id_str;
            // i kaži Tviteru da ga retvituje:
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
            	// Ako je uspelo napiši u cmd:
                if (response) {
                    console.log('Uspelo!');
                }
                // Ako je došlo do greške prilikom tvitovanja napiši u cmd:
                if (err) {
                    console.log('Došlo je do greške prilikom tvitovanja.');
                }
            });
        }
        // Ukoliko je pretraga bila neuspešna napiši u cmd:
        else {
          console.log('Neuspešna pretraga.');
        }
    });
};


// Retvituj na svakih 50 minuta:
setInterval(retweet, 3000000); 
