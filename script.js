const sites = ["ptv_departures", "dashboard", "notepad", "colour_picker", "refraction_simulator"];
const sitesDiv = document.getElementById("sites_div");

for (const site of sites) {
    let div = sitesDiv.createElement('div');

    let link = sitesDiv.createElement('a');
    link.href = `https://user0149.github.io/${site.path}`;
    link.innerText = `https://user0149.github.io/${site.path}`;

    div.appendChild(link);
    sitesDiv.appendChild(div);
}