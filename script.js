const sites = ["ptv_departures", "dashboard", "notepad", "colour_picker", "refraction_simulator"];
const sitesDiv = document.getElementById("sites_div");

for (const site of sites) {
    const div = document.createElement('div');

    const link = document.createElement('a');
    link.href = `./${site}`;
    link.innerText = `https://user0149.github.io/${site}`;

    div.appendChild(link);
    sitesDiv.appendChild(div);
}