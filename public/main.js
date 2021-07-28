import Config from './config.js';

let userName = prompt("Please Enter your name");
const userDiv = document.getElementById("user");
const titleElement = document.getElementById("title");
const homeProfile = document.getElementById("home__profile");
const homeServices = document.getElementById("home__services");


while (!userName) {
  userName = prompt("Please Enter your name");
}

userDiv.textContent = userDiv.textContent + " " + userName;

const titleText = titleElement.textContent;

let titleArray = titleText.split("");
const titleArrayClone = [...titleArray];
titleElement.textContent = "";
let timer;

const animateText = function () {
  timer = setInterval(animateTitle, 100);
};
routeToPath('home');
configureRouting();
animateText();

function animateTitle() {
  titleElement.textContent += titleArray.shift();
  if (!titleArray.length) {
    titleElement.textContent = "";
    titleArray = [...titleArrayClone];
  }
}

titleElement.addEventListener("mouseleave", () => {
  animateText();
});

titleElement.addEventListener("mouseenter", () => {
  clearInterval(timer);
});

function configureRouting() {
  Array.from(document.getElementsByTagName("a")).forEach((a) => {
    a.addEventListener("click", (e) => {
    Array.from(document.getElementsByTagName("a")).forEach(el=> el.classList.remove("active")) 
      const config = Config;
      const path = e.currentTarget.id;
      
      routeToPath(path,config);
    });
  });
}

function routeToPath(path,config = Config) {
  let value;
  if (config[path]) {
      document.getElementById(path).classList.add('active');
    const dataObj = config[path];
    fetch(dataObj.api)
      .then((res) => res.json())
      .then((data) => {
        value = data;
        if(!value.hasOwnProperty('data')) {
            value.data = value;
        }
        history.pushState(value, dataObj.title, path);
       const process =  new ProcessPaint(homeProfile, value.data);
       process[path]();
      });
  }
}


function ProcessPaint (parentElement, data) {
    this.data = data;

    this.home = function() {
        parentElement.innerHTML = "";
        homeProfile.style.display = 'grid';
        homeServices.style.display = "none";
       if(Array.isArray(this.data)) {
            this.data.forEach(el=>{
                const profile = document.createElement('div');
                const img = document.createElement('img');
                const span = document.createElement('span');
                img.src = el.avatar;
                span.textContent = el.first_name;
                profile.className = "profile";
                profile.append(img);
                profile.append(span);
                parentElement.append(profile)

            })
       }
    }


    this.services = function() {
        homeProfile.style.display = 'none';
        homeServices.style.display = "flex";
        homeServices.innerHTML = "";
        this.data.forEach(el=>{
            const p = document.createElement("p");

            p.innerHTML = `<input type="checkbox" value=${el.completed} /> ${el.title} `

            homeServices.append(p);

        })
    }
}
