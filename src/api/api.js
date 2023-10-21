let api = "http://localhost:8000"

//let count = 0;
export async function getQuestions() {
    try {
        let response = await fetch(`${api}/questions`);
        //console.log("response", response)
        if (response.status === 200) {
            let jsonResponse = await response.json()
            //console.log(jsonResponse);
            //console.log(jsonResponse.questions)
            let questions = jsonResponse.questions;
            //count += 1;
            //console.log("count:", count)
            return questions
        }

    }
    catch (err) {
        console.log(err)
    }

}

//export default getQuestions;

export async function submitTest(testObject) {
    try {
        //console.log("answer script", testObject)
        let response = await fetch(`${api}/mark`, {
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            method: "POST",
            body: JSON.stringify(testObject)
        })
        let jsonResponse = await response.json();
        return jsonResponse
    } catch (error) {
        console.log(error)
    }

}

export async function fetchResults() {
    try {
        let response = await fetch(`${api}/results`);
        if (response.status === 200) {
            let jsonResponse = await response.json()
            //console.log("fetched Results", jsonResponse)
            return jsonResponse;
        }

    } catch (error) {
        console.log(error)

    }


}