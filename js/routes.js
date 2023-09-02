export class Router {
    routes = {} 
  
    add(routeName, page) {
      this.routes[routeName] = page
    }
    
    route(event) {
      event = event || window.event
      event.preventDefault()
  
      window.history.pushState({}, "", event.target.href)
  
      this.handle()
    }
  
    handle() {
      const { pathname }  = window.location
      const route = this.routes[pathname]
      fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
        this.update(html)
      })
    }

    update(html) {
        let body = document.querySelector("body")
        let homeNav = document.querySelector("#home-nav")
        let universoNav = document.querySelector("#universo-nav")
        let exploracaoNav = document.querySelector("#exploracao-nav")
        if(html.includes('home')) {
            body.style.backgroundImage = `url(./assets/mountains-universe-1.png)`;
            homeNav.classList.add("isSelected")
            universoNav.classList.remove("isSelected")
            exploracaoNav.classList.remove("isSelected")
        }
        if(html.includes('universo')) {
            body.style.backgroundImage = `url(./assets/mountains-universe02.png)`;
            universoNav.classList.add("isSelected")
            homeNav.classList.remove("isSelected")
            exploracaoNav.classList.remove("isSelected")
        }
        if(html.includes('exploracao')) {
            body.style.backgroundImage = `url(./assets/mountains-universe-3.png)`;
            exploracaoNav.classList.add("isSelected")
            universoNav.classList.remove("isSelected")
            homeNav.classList.remove("isSelected")
        }
    }
  
}