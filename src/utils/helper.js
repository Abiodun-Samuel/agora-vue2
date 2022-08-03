export const unslugify = (slug) => {
  const result = slug.replace(/-/g, " ");
  return result.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const randomId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// generate a dynamic uid for agora
export const generateUid = (string) => {
  return slugify(string) + "#" + randomId(5);
};

// generate display name from generated uid
export const generateName = (string) => {
  let unslug = unslugify(string);
  return unslug.split("#")[0];
};
