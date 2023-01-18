

url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

$(window).ready(function() {
    let data = d3.json(url);
        d3.json(url).then(function(data) {
        console.log(data);
        selectSubjectID(data);
        doStuffWithData(940, data);
    });
});


function selectSubjectID(data) {

    let subject_ids = data.names;

    // populate Test Subject ID No: dropdown and select subject id number

    for (let j = 0; j < subject_ids.length; j++) {

        d3.select("#selDataset").append("option").text(subject_ids[j]);
    
    }
    
    d3.select("#selDataset").on("change", function() {
        let smp_id = d3.select("#selDataset").node().value;  
        console.log(smp_id);
        doStuffWithData(smp_id, data);
       })

    
}

function doStuffWithData(smp_id, data) {

// transform data from JSON  into main components

let samples = data.samples;
let metadata = data.metadata;

// transform data for bar graph and for bubble graph

let samples_filtered = samples.filter(x => x.id == smp_id);

let otuintegs = samples_filtered[0].otu_ids;
let otus = otuintegs.map(x => 'OTU ' + String(x));
let otu_integ_vals = otuintegs.slice().reverse();

let lent = otus.length;

let samp_vals = samples_filtered[0].sample_values.slice().reverse();
let otu_id_vals = otus.slice().reverse();
let otu_label_vals = samples_filtered[0].otu_labels.slice().reverse();

// create bar graph using plotly

var trace1 = {
    type: 'bar',
    x: samp_vals.slice(lent-10, lent),
    y: otu_id_vals.slice(lent-10,lent),
    text: otu_label_vals.slice(lent-10,lent),
    //name: 'Belly Button Data',
    orientation: 'h',
    marker: {
        color: 'aquamarine',
        width: 100
    }
};

traces = [trace1]

var layout = {
    title: "Size versus ID"
}

Plotly.newPlot('bar_plot', traces, layout);

// display Demographic Info

metadata_filtered = metadata.filter(x => x.id == smp_id);

d3.select("#subj_id").text('ID: ' + String(metadata_filtered[0].id));
d3.select("#ethnicity").text('Ethnicity: ' + String(metadata_filtered[0].ethnicity));
d3.select("#gender").text('Gender: ' + String(metadata_filtered[0].gender));
d3.select("#age").text('Age: ' + String(metadata_filtered[0].age));
d3.select("#location").text('Location: ' + String(metadata_filtered[0].location));
d3.select("#bbtype").text('BBType: ' + String(metadata_filtered[0].bbtype));
d3.select("#wfreq").text('WFrequency: ' + String(metadata_filtered[0].wfreq));

//Bubble Chart

var trace2 = {
    x: otu_integ_vals,
    y: samp_vals,
    mode: 'markers',
    text: otu_label_vals,
    marker: {
      size: samp_vals.map(x => x),
      color: otu_integ_vals
    }
  };
  
  var traces2 = [trace2];
  
  var layout2 = {
    title: 'OTU IDs Versus Sample Value',
    showlegend: false,
    height: 600,
    width: 1200,
    xaxis: {
        title: {
          text: 'OTU IDs',
          font: {
            //family: 'Courier New, monospace',
            size: 15,
            //color: '#7f7f7f'
          }
        },
      },
  };
  
  traces2 = [trace2]

  Plotly.newPlot('bubble', traces2, layout2);

// transform data for gauge chart

wash_freq = metadata_filtered[0].wfreq;

//gauge chart

var trace3 = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: wash_freq,
		title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
        subtitle: {text: "Scrubs Per Week"},
        bar: { color: "darkblue" },
		type: "indicator",
		mode: "gauge+number",
        gauge: {
            axis: { range: [null, 10] },
            // steps: [
            //     { range: [0, 1], color: "lightgray", text: "0-1" },
            //     { range: [1, 2], color: "gray" }
            //   ]
        }
	}
];

var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };

Plotly.newPlot('gauge', trace3, layout3);







}