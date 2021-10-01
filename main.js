prediction_1 = "";
prediction_2 = "";

//Webcam code
Webcam.set ({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

//Taking Snap
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    })
}

//Putting ml5 Version in console and loading the model
console.log("ml5 Version- ",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UmjEF7_2I/model.json",modelLoaded);

function modelLoaded() {
    console.log("Model is Loaded");
}

//Creating speechSynthesisUtterance object
function speak() {
    synth = window.speechSynthesis;
    speakData_1 = "Prediction 1 is- " + prediction_1;
    speakData_2 = "Prediction 2 is- " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speakData_1 + speakData_2);
    synth.speak(utterThis);
}


function predict_emoji() {
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

//Identifing the results and error and displaying the final results
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
     else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak()

        //Prediction 1 Code

        if (prediction_1 == "Happy") {
            document.getElementById("emoji_result_1").innerHTML = "&#128515";
        }

        if (prediction_1 == "Sad") {
            document.getElementById("emoji_result_1").innerHTML = "&#128532";
        }

        if (prediction_1 == "Angry") {
            document.getElementById("emoji_result_1").innerHTML = "&#128545";
        }

        //Prediction 2 Code

        if (prediction_2 == "Happy") {
            document.getElementById("emoji_result_2").innerHTML = "&#128515";
        }

        if (prediction_2 == "Sad") {
            document.getElementById("emoji_result_2").innerHTML = "&#128532";
        }

        if (prediction_2 == "Angry") {
            document.getElementById("emoji_result_2").innerHTML = "&#128545";
        }
    }
}