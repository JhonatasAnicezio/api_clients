const bcrypt = require('bcrypt');

// Gera um salt com 15 rounds
const salt = bcrypt.genSaltSync(15);

console.log(salt); // Exibe o salt no formato esperado
