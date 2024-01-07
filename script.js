var selectedName = "", selectedQuestion = "";
// Define a callback function to display the alert
function displayAlert(name, question) {
    // Play the audio
    var audio = document.getElementById("successAudio");
    if (audio) {
        audio.play();
    }

    // Set a timeout to display the alert after a short delay
    setTimeout(function () {
        alert("Name : " + name + "\nQuestion : " + question);
    }, 100); // Adjust the delay to match the audio length or as needed
}




//names part
var paddingNames = { top: 20, right: 40, bottom: 0, left: 0 },
    wNames = 500 - paddingNames.left - paddingNames.right,
    hNames = 500 - paddingNames.top - paddingNames.bottom,
    rNames = Math.min(wNames, hNames) / 2,
    rotationNames = 0,
    oldrotationNames = 0,
    pickedNames = 100000,
    oldpickNames = [],
    colorNames = d3.scale.category20();

var namesList = [
    "ABSSA NOUHAILA", "ACHATA AYOUB", "AGOURAM ABDESSAMAD",
    "AIT ADDI YAHYA", "AIT-MAARIR OMAR", "AKHRAIRIZ LAHOUCINE",
    "ALIDRISSI NABIL NAJLAE", "BELLALI SOUFIANE",
    "BEN MAHMD MOHAMED", "BOUADDI FATIHA", "BOUDDAFATE ABDELKARIM",
    "BOUHIA MOHAMED", "BOUZID ASMA",
    "DAQUA MOUNIR", "ED-DAHBY YOUSSEF", "EL BAZ LAILA", "ELALAOUI ISMAIL",
    "ELASRI ASMA", "HIMMICHE YASSINE", "KANANE SAADIA", "KARMAS NABIL",
    "KARYM MINA", "KHALIL RAMADAN", "LAKHEL FATIMA ZAHRA", "MARNIN MARIAM",
    "MERROUCH WAFAE", "MOUMOUD TAOUFIK", "MOURID RADOUANE", "SIDI EL ALEM AICHA",
    "SIDKI ABDELLATIF", "TAKAAD OUSSAMA", "TOBI OUSSAMA", "TOUMI SAAD",
    "ZAROIL MOHAMED"
];


var dataNames = namesList.map(function (label, index) {
    return { "label": label, "value": index + 1 };
});

var svgNames = d3.select('#chart')
    .append("svg")
    .attr("width", wNames + paddingNames.left + paddingNames.right)
    .attr("height", hNames + paddingNames.top + paddingNames.bottom);

var containerNames = svgNames.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (wNames / 2 + paddingNames.left) + "," + (hNames / 2 + paddingNames.top) + ")");

var vis1Names = containerNames.append("g");

var pieNames = d3.layout.pie().sort(null).value(function (d) { return 1; });
var arcNames = d3.svg.arc().outerRadius(rNames);
var arcsNames = vis1Names.selectAll("g.slice")
    .data(pieNames(dataNames))
    .enter()
    .append("g")
    .attr("class", "slice");

arcsNames.append("path")
    .attr("fill", function (d, i) { return colorNames(i); })
    .attr("d", function (d) { return arcNames(d); })
    .attr("class", "name-path"); // Added class for styling

arcsNames.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = rNames;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
    .attr("text-anchor", "end")
    .text(function (d, i) {
        return dataNames[i].label;
    });

containerNames.on("click", function () {
    spinNames(dataNames, vis1Names, containerNames);
});

function spinNames(data, vis1, container) {
    container.on("click", null);

    var spinaudio = document.getElementById("spinAudio");
    if (spinaudio) {
        spinaudio.play();
    }

    if (oldpickNames.length === data.length) {
        console.log("done");
        container.on("click", null);
        return;
    }

    var ps = 360 / data.length,
        rng = Math.floor((Math.random() * 1440) + 360);

    rotationNames = (Math.round(rng / ps) * ps);

    pickedNames = Math.round(data.length - (rotationNames % 360) / ps);
    pickedNames = pickedNames >= data.length ? (pickedNames % data.length) : pickedNames;
    if (oldpickNames.indexOf(pickedNames) !== -1) {
        spinNames(data, vis1, container);
        return;
    } else {
        oldpickNames.push(pickedNames);
    }
    rotationNames += 90 - Math.round(ps / 2);
    vis1.selectAll(".slice path") // Select all paths within the slice class
        .attr("class", function (d, i) {
            return i === pickedNames ? "name-path picked" : "name-path";
        });

    vis1.transition()
        .duration(3000)
        .attrTween("transform", rotTweenNames)
        .each("end", function () {
            d3.select(".slice:nth-child(" + (pickedNames + 1) + ") path")
                .attr("fill", "#333");
            // Display the selected name in an alert
            selectedName = data[pickedNames].label;

            oldrotationNames = rotationNames;
            container.on("click", function () {
                spinNames(data, vis1, container);
            });

        });
}

svgNames.append("g")
    .attr("transform", "translate(" + (wNames + paddingNames.left + paddingNames.right) + "," + ((hNames / 2) + paddingNames.top) + ")")
    .append("path")
    .attr("d", "M-" + (rNames * .15) + ",0L0," + (rNames * .05) + "L0,-" + (rNames * .05) + "Z")
    .style({ "fill": "white" });

//draw spin circle
containerNames.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 50)
    .style({ "fill": "#99ffff", "cursor": "pointer" });
//spin text
containerNames.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({ "font-weight": "bold", "font-size": "30px" });


function rotTweenNames(to) {
    var i = d3.interpolate(oldrotationNames % 360, rotationNames);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}
//end name part //////////////////////////////////////////////////////////////////////////////////////









//begin questions part
var paddingQuestions = { top: 20, right: 40, bottom: 0, left: 0 },
    wQuestions = 500 - paddingQuestions.left - paddingQuestions.right,
    hQuestions = 500 - paddingQuestions.top - paddingQuestions.bottom,
    rQuestions = Math.min(wQuestions, hQuestions) / 2,
    rotationQuestions = 0,
    oldrotationQuestions = 0,
    pickedQuestions = 100000,
    oldpickQuestions = [],
    colorQuestions = d3.scale.category20();

var questionsList = [
    "Quelles sont les obligations de l’employeur!?",
    "Qu’elles démarche doit suivre un salarié atteint d’une maladie prof !??",
    "Comment prévenir des accidents de travail!?",
    "Citer brièvement les types des maladies prof!?",
    "C’est quoi une maladie professionnelle!?",
    "Qui est-ce qu'un accident de travail?",
    "Quelles sont les catégories des accidents de travail!?",
    "Quelles sont les responsabilités des employeurs!?",
    "Quelles sont les responsabilités des employés!?",
    "Pouvez-vous venir ici et nous donner un résumé de cette présentation!?"
];


var dataQuestions = questionsList.map(function (label, index) {
    return { "label": label, "value": index + 1 };
});

var svgQuestions = d3.select('#question')
    .append("svg")
    .attr("width", wQuestions + paddingQuestions.left + paddingQuestions.right)
    .attr("height", hQuestions + paddingQuestions.top + paddingQuestions.bottom);

var containerQuestions = svgQuestions.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (wQuestions / 2 + paddingQuestions.left) + "," + (hQuestions / 2 + paddingQuestions.top) + ")");

var vis1Questions = containerQuestions.append("g");

var pieQuestions = d3.layout.pie().sort(null).value(function (d) { return 1; });
var arcQuestions = d3.svg.arc().outerRadius(rQuestions);
var arcsQuestions = vis1Questions.selectAll("g.question")
    .data(pieQuestions(dataQuestions))
    .enter()
    .append("g")
    .attr("class", "question");

arcsQuestions.append("path")
    .attr("fill", function (d, i) { return colorQuestions(i); })
    .attr("d", function (d) { return arcQuestions(d); })
    .attr("class", "question"); // Added class for styling

arcsQuestions.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = rQuestions;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
    .attr("text-anchor", "end")
    .text(function (d, i) {
        return dataQuestions[i].label.slice(0, 30);
    });

containerQuestions.on("click", function () {
    spinQuestions(dataQuestions, vis1Questions, containerQuestions);
});

function spinQuestions(data, vis1, container) {
    container.on("click", null);

    var spinaudio = document.getElementById("spinAudio");
    if (spinaudio) {
        spinaudio.play();
    }

    if (oldpickQuestions.length === data.length) {
        console.log("done");
        container.on("click", null);
        return;
    }

    var ps = 360 / data.length,
        rng = Math.floor((Math.random() * 1440) + 360);

    rotationQuestions = (Math.round(rng / ps) * ps);

    pickedQuestions = Math.round(data.length - (rotationQuestions % 360) / ps);
    pickedQuestions = pickedQuestions >= data.length ? (pickedQuestions % data.length) : pickedQuestions;
    if (oldpickQuestions.indexOf(pickedQuestions) !== -1) {
        spinQuestions(data, vis1, container);
        return;
    } else {
        oldpickQuestions.push(pickedQuestions);
    }
    rotationQuestions += 90 - Math.round(ps / 2);
    vis1.selectAll(".question") // Corrected class selector to update question-path class
        .attr("class", function (d, i) {
            return i === pickedQuestions ? "question picked" : "question";
        });

    vis1.transition()
        .duration(3000)
        .attrTween("transform", rotTweenQuestions)
        .each("end", function () {
            d3.select(".question:nth-child(" + (pickedQuestions + 1) + ") path")
                .attr("fill", "#333");
            // Display the selected name and question in a single alert
            selectedQuestion = data[pickedQuestions].label;

            oldrotationQuestions = rotationQuestions;
            container.on("click", function () {
                spinQuestions(data, vis1, container);
            });

            // Check if both selectedName and selectedQuestion are set and call the callback
            if (selectedName && selectedQuestion) {
                displayAlert(selectedName, selectedQuestion);
            }
            selectedQuestion = "";
            selectedName = "";
        });
}

svgQuestions.append("g")
    .attr("transform", "translate(" + (wQuestions + paddingQuestions.left + paddingQuestions.right) + "," + ((hQuestions / 2) + paddingQuestions.top) + ")")
    .append("path")
    .attr("d", "M-" + (rQuestions * .15) + ",0L0," + (rQuestions * .05) + "L0,-" + (rQuestions * .05) + "Z")
    .style({ "fill": "white", "margin-left": "400" });
//draw spin circle
containerQuestions.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 50)
    .style({ "fill": "#99ffff", "cursor": "pointer" });
//spin text
containerQuestions.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({ "font-weight": "bold", "font-size": "30px" });



function rotTweenQuestions(to) {
    var i = d3.interpolate(oldrotationQuestions % 360, rotationQuestions);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}
//end of questions part //////////////////////////////////////////////////////////////////////