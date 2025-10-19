(async () => {
    const response = await fetch("https://api.github.com/repos/User0149/User0149.github.io/contents/");
    if (!response.ok) alert("Could not fetch data.");

    const sites = await response.json();
    
    for (const site of sites) {
        if (site.type !== "dir") continue;
        let div = document.createElement('div');

        let link = document.createElement('a');
        link.href = `https://user0149.github.io/${site.path}`;
        link.innerText = `https://user0149.github.io/${site.path}`;

        div.appendChild(link);
        document.body.appendChild(div);
    }
})();