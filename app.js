// Init
if (typeof mots == "undefined") {
  document.querySelector(".texte").textContent = "";
  var mots = [];
  var occurenceMots = [];
  var caracteres = [];
  var listeMots = new Map();
  var motsDejaListe = [];
  var nombreOccurenceMots = [];
  var text = "";
  var compteurCaracteres = 0;
}

// function reset when a new text is enter
const reset = () => {
  compteurCaracteres = 0;
  mots = [];
  occurenceMots = [];
  caracteres = [];
  listeMots = new Map();
  motsDejaListe = [];
  nombreOccurenceMots = [];
  text = "";
  document.querySelector(".mots").innerHTML = "";
  document.querySelector(".nombres").innerHTML = "";
};

// Allows to display according to the values
const afficheEcran = () => {
  if (compteurCaracteres < 1000) {
    document.querySelector(".nombreCaracteres").textContent =
      compteurCaracteres;
  } else if (compteurCaracteres >= 1000 && compteurCaracteres < 10000) {
    let tmp = compteurCaracteres.toString();
    document.querySelector(".nombreCaracteres").textContent =
      tmp[0] + " " + tmp[1] + tmp[2] + tmp[3];
  } else if (compteurCaracteres >= 10000 && compteurCaracteres < 100000) {
    let tmp = compteurCaracteres.toString();
    document.querySelector(".nombreCaracteres").textContent =
      tmp[0] + tmp[1] + " " + tmp[2] + tmp[3] + tmp[4];
  } else {
    let tmp = compteurCaracteres.toString();
    document.querySelector(".nombreCaracteres").textContent =
      tmp[0] + tmp[1] + tmp[2] + " " + tmp[3] + tmp[4] + tmp[5];
  }

  if (mots.length < 1000) {
    document.querySelector(".nombreMots").textContent = mots.length;
  } else if (mots.length >= 1000 && mots.length < 10000) {
    let tmp = mots.length.toString();
    document.querySelector(".nombreMots").textContent =
      tmp[0] + " " + tmp[1] + tmp[2] + tmp[3];
  } else if (mots.length >= 10000 && mots.length < 100000) {
    let tmp = mots.length.toString();
    document.querySelector(".nombreMots").textContent =
      tmp[0] + tmp[1] + " " + tmp[2] + tmp[3] + tmp[4];
  } else {
    let tmp = mots.length.toString();
    document.querySelector(".nombreMots").textContent =
      tmp[0] + tmp[1] + tmp[2] + " " + tmp[3] + tmp[4] + tmp[5];
  }

  for (let [key, value] of listeMots) {
    document.querySelector(".mots").innerHTML += key + "<br/>";
    document.querySelector(".nombres").innerHTML += value + "<br/>";
  }
};

// Search if a word is in an array
function estDansLeTableau(mot, tableau) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] == mot) {
      return true;
    }
  }
  return false;
}

// Get the number of times a word is write in a text
function occurenceDansTableau(mot) {
  let res = 0;
  for (let i = 0; i < mots.length; i++) {
    if (mots[i] == mot) {
      res++;
    }
  }
  return res;
}

// When the button "Comptez !" is cliked
document.querySelector("button").addEventListener("click", (event) => {
  reset();
  var caracteresTmp = document.querySelector("textarea");
  for (let i = 0; i < caracteresTmp.textLength; i++) {
    caracteres[i] = caracteresTmp.value.substring(i, i + 1);

    // Count the number of characters in the text
    if (caracteres[i] != " ") {
      compteurCaracteres++;
    }
  }

  for (let i = 0; i < caracteres.length; i++) {
    if (
      caracteres[i] == "," ||
      caracteres[i] == "." ||
      caracteres[i] == "!" ||
      caracteres[i] == "?" ||
      caracteres[i] == ";" ||
      caracteres[i] == "'" ||
      caracteres[i] == "-" ||
      caracteres[i] == "{" ||
      caracteres[i] == '"' ||
      caracteres[i] == "(" ||
      caracteres[i] == "[" ||
      caracteres[i] == "&" ||
      caracteres[i] == "#" ||
      caracteres[i] == "|" ||
      caracteres[i] == "_" ||
      caracteres[i] == "@" ||
      caracteres[i] == ")" ||
      caracteres[i] == "]" ||
      caracteres[i] == "+" ||
      caracteres[i] == "=" ||
      caracteres[i] == "}" ||
      caracteres[i] == ":"
    ) {
      caracteres[i] = " ";
    }
  }

  // Delete all the "excess" space
  for (let i = 0; i < caracteres.length - 1; i++) {
    if (caracteres[i] == " ") {
      let j = i + 1;
      while (caracteres[j] == " ") {
        let tmp = caracteres.splice(j, 1);
      }
    }
  }

  // Delete all the space before the first character
  let j = 0;
  while (caracteres[j] == " ") {
    let tmp = caracteres.splice(j, 1);
    j++;
  }

  // Delete all the space after the last character
  j = caracteres.length - 1;
  while (caracteres[j] == " ") {
    let tmp = caracteres.splice(j, 1);
    j--;
  }

  for (let i = 0; i < caracteres.length; i++) {
    text += caracteres[i];
  }

  text = text.toLowerCase();

  // list of all the word of the text
  mots = text.split(" ");

  // Map with Key --> word and Value --> occurence
  for (let i = 0; i < mots.length; i++) {
    if (!estDansLeTableau(mots[i], motsDejaListe)) {
      listeMots.set(mots[i], occurenceDansTableau(mots[i]));
    }
  }

  // Sort the list in ascending order
  listeMots = new Map([...listeMots.entries()].sort((a, b) => b[1] - a[1]));

  afficheEcran();
});
