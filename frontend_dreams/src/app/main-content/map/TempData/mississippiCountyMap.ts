
async function fetchText() {
        let response = await fetch('http://localhost:8080/server/webapi/maps/Mississippi',  );
        console.log("f")
        console.log(response.status); // 200
        console.log(response.statusText); // OK
    
        if (response.status === 200) {
            let data = await response.text();
            console.log(data)
            return JSON.parse(data);
            // handle data
        }
        
}

const geojson = () => fetchText();




export default fetchText();