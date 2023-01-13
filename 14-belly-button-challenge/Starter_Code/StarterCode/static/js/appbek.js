//Begin by creating a global variable to make
//it easier to access and call data
var data = {};
d3.json("./samples.json").then(function (call_data) {
  console.log(call_data);
  data = call_data;
    //Save all created functions here for global variable
        loadDrop();
        getDemo("940");
        });


        function loadDrop() {
  for (let i = 0; i < data.names.length; i++){
    let name = data.names[i];
    d3.select("#selDataset").append("option").text(name);
  }
}
//Show when the drop down is clicked in Demo info
function optionChanged(val) {
    getDemo(val);
}
    //Generate the sample-metadata to show in the panel-body
    //of the demographic info table
    function getDemo(val) {

        metadata = call_data.metadata;
        samples = call_data.samples;

        // for demographic info table

        metadata_filtered = metadata.filter(x => x.id == val);

        subject_id = metadata_filtered[0].id;
        ethnicity = metadata_filtered[0].ethnicity;
        gender = metadata_filtered[0].gender;
        age = metadata_filtered[0].age;
        location = metadata_filtered[0].location;
        bbtype = metadata_filtered[0].bbtype;
        wfreq = metadata_filtered[0].wfreq;

        console.log(ethnicity);

        


    }


