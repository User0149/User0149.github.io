let embed_names=["binomial_distribution","function_grapher","projectile_motion","birthday_problem","hexadecimal_counting","range_tree","bounce","maze","regression_calculator","bowtie_theorem","minimum_spanning_tree","sine_wave","breadth_first_search","monte_carlo_method","sound_wave","collatz_conjecture","polynomial_grapher","square_root_decomposition","electric_field","power_mean_inequality","tree_traversals"];

let main_embeds=embed_names.map(elem => "animations/" + elem + "/index.html");

document.getElementById("main_embed").src=main_embeds[Math.floor(Math.random()*main_embeds.length)];