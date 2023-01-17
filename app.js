if (typeof mots == "undefined") {
  document.querySelector(".texte").textContent = "";
  var mots = [];
  var occurenceMots = [];
  var caracteres = [];
  var listeMots = [];
  var motsDejaListe = [];
  var nombreOccurenceMots = [];
  var text = "";
  var compteurCaracteres = 0;
}

const reset = () => {
  compteurCaracteres = 0;
  mots = [];
  occurenceMots = [];
  caracteres = [];
  listeMots = [];
  motsDejaListe = [];
  nombreOccurenceMots = [];
  text = "";
  document.querySelector(".mots").innerHTML = "";
  document.querySelector(".nombres").innerHTML = "";
};

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

  for (let i = 0; i < listeMots.length; i++) {
    document.querySelector(".mots").innerHTML += listeMots[i] + "<br/>";
  }
};

function estDansLeTableau(mot, tableau) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] == mot) {
      return true;
    }
  }
  return false;
}

function occurenceDansTableau(mot) {
  let res = 0;
  for (let i = 0; i < mots.length; i++) {
    if (mots[i] == mot) {
      res++;
    }
  }
  return res;
}

document.querySelector("button").addEventListener("click", (event) => {
  reset();
  var caracteresTmp = document.querySelector("textarea");
  for (let i = 0; i < caracteresTmp.textLength; i++) {
    caracteres[i] = caracteresTmp.value.substring(i, i + 1);
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

  for (let i = 0; i < caracteres.length - 1; i++) {
    if (caracteres[i] == " ") {
      let j = i + 1;
      while (caracteres[j] == " ") {
        let tmp = caracteres.splice(j, 1);
      }
    }
  }

  let j = 0;
  while (caracteres[j] == " ") {
    let tmp = caracteres.splice(j, 1);
    j++;
  }

  j = caracteres.length - 1;
  while (caracteres[j] == " ") {
    let tmp = caracteres.splice(j, 1);
    j--;
  }

  for (let i = 0; i < caracteres.length; i++) {
    text += caracteres[i];
  }

  text = text.toLowerCase();

  mots = text.split(" ");

  for (let i = 0; i < mots.length; i++) {
    if (!estDansLeTableau(mots[i], motsDejaListe)) {
      listeMots.push("(" + occurenceDansTableau(mots[i]) + ")" + mots[i]);
      motsDejaListe.push(mots[i]);
    }
  }

  listeMots.sort();
  listeMots.reverse();

  for (let i = 0; i < listeMots.length; i++) {
    let tmpText = listeMots[i].split("");
    let j = 0;
    while (tmpText[j] != ")") {
      j++;
    }

    let tmpNombre = listeMots[i]
      .substring(0, j + 1)
      .replace("(", "")
      .replace(")", "");

    listeMots[i] = listeMots[i].slice(j + 1, listeMots[i].length);

    document.querySelector(".nombres").innerHTML += tmpNombre + "<br/>";
  }

  afficheEcran();
});
