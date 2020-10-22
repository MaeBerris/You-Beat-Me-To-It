const loadDeezer = (callback) => {
  const existingScript = document.getElementById("Deezer");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://cdns-files.dzcdn.net/js/min/dz.js";
    script.id = "Deezer";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadDeezer;
