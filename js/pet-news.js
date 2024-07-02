document.addEventListener("DOMContentLoaded", function() {
    fetch("news.json")
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.querySelector(".news-container");
            data.forEach((news, index) => {
                const newsDiv = document.createElement("div");
                newsDiv.classList.add("relative", "w-[17.5rem]", "sm:w-[15.5rem]", "md:w-[19rem]", "lg:w-[27rem]", "xl:w-[35rem]", "h-80", "flex", "justify-center", "items-center", "flex-col", "opacity-80");
                newsDiv.setAttribute("style", "display: flex; border-radius: 4px; padding: 5px; align-items: center; justify-content: center; position:relative; box-shadow: #ddd; margin: auto; width: fit-content; height: min-content; padding-bottom: 5%; text-align: center; vertical-align:middle; padding-right: 4%; background-color: #93cab5;");

                const heading = document.createElement("h1");
                heading.classList.add("text-3xl", "mt-28", "ml-10");
                heading.setAttribute("style", "color: white;");
                heading.innerHTML = `<strong>${news.heading}</strong>`;
                newsDiv.appendChild(heading);

                const newsTextDiv = document.createElement("div");
                newsTextDiv.classList.add("text-lg", "ml-10", "mt-8", "sm:mb-28", "sm:w-10/12", "flex", "sm:flex-row", "flex-col");
                newsTextDiv.setAttribute("style", "display: flex; border-radius: 4px; padding: 5px; align-items: center; justify-content: center; position:relative; box-shadow: #ddd; margin:auto; background-color: #5c8374; max-width: 95%;");

                const newsImg = document.createElement("img");
                newsImg.classList.add("relative", "ml-14", "w-56", "h-56", "object-cover", "rounded-2xl", "shadow-lg", "shadow-red-700/50");
                newsImg.setAttribute("src", news.image);
                newsImg.setAttribute("style", "margin-top: 5px; margin-bottom: 5px;");
                newsTextDiv.appendChild(newsImg);

                const newsText = document.createElement("span");
                newsText.setAttribute("style", "padding: 20px; text-align: justify; font-family: 'Josefin Sans', sans-serif; color: white;");
                newsText.innerHTML = `<strong>${news.content}</strong>`;
                newsTextDiv.appendChild(newsText);

                newsContainer.appendChild(newsDiv);
                newsContainer.appendChild(newsTextDiv);
            });
        })
        .catch(error => console.error("Error fetching news data:", error));
});
