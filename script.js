(async () => {
    try {
        const response = await fetch("https://api.github.com/repos/User0149/User0149.github.io/contents/");
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
    }
    catch (err) {
        alert("An error has occurred. Check console for details.");
        console.error(err);
    }
})();