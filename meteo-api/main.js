const apikey2 ="289366cc074253cd4987b1bb8bea1232";
const apikey  ="527accf3232f198a062c999b9456f7aa";
const url="http://api.openweathermap.org/data/2.5/weather?zip=92320,fr&appid=";
const page=document.querySelector("body");

class MeteoVille{
    // constructeur de la classe
    constructor(element){
        this.element=element;
        this.temperature=element.querySelector("#temperature");
        this.zipville=element.querySelector("#input");
        this.ville=element.querySelector('#ville');
        this.force=element.querySelector('#vent-force');
        this.direction=element.querySelector('#vent-direction');
        this.description=element.querySelector('#meteo');
        this.langue=element.querySelector('#langue-select');
    }
    // 
    api(){
        let codepostal = this.zipville.value;
        if(  codepostal.length== 5)
        { 
            let lang = this.langue.value;
            // ajout de la langue pour la description du temps présent
            let url_complet = url+apikey+"&lang="+lang;
        // remplace 92320 par la valeur de input
            let newurl=url_complet.replace("92320",codepostal);
            console.log(newurl);
            fetch(newurl).then(response => response.json())
            .then(data =>     
            {
                //  le nom de la ville
                // console.log(data.name);
                this.nomville(data.name);
                //  la température
                // console.log(data.main.temp);
                this.tempe(data.main.temp);
                // informations vents
                // console.log(data.wind.speed);
                // console.log(data.wind.deg);
                this.vent(data.wind.speed,data.wind.deg);
                // 
                // let meteo=data.weather;
                console.log(data.weather[0].description);
                // console.log(data.coord.lat);
                this.information(data.weather[0].description);
            }
            ) .catch((err) => console.log('Erreur : ' + err));
        }
    }
    tempe(temp){
        let degC=  parseFloat(temp) -273.15;
        this.temperature.textContent = degC.toFixed(2).toString() + ' °C'  ;
    }
    nomville(nom){
        this.ville.textContent=nom;
    }
    vent(force,direction){
        this.force.textContent = force + ' m/s';
        this.direction.textContent = direction + ' deg';
    }
    information(info){
        this.description.textContent=info;
    }
}

MaVille = new MeteoVille(page);

MaVille.zipville.addEventListener('input',()=>{
    // console.log(MaVille.nomville.value);
    MaVille.api();
    // pour éviter le retour du bouton
    // event.preventDefault();
})