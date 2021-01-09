// test to see if server is recieving data //
d3.json(" ./samples.json").then((data) => {
    // data => names, metadata, samples //
    console.log(data)
    // names : list of id numbers //
    //console.log(data.names)
    // metadata => id, ethnicity, gender, age, location //
    console.log(data.metadata[0].age)
    // samples => id, otu_ids, sample_values, out_labels
    //console.log(data.samples)
    
    // inserting id options into dropdown menu
    var dropdown = d3.select("#selDataset")
    dropdown.selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text(entry => {return entry})

    })

// optionChanged function to change graphs //
function optionChanged(input) {
    input = +input
    console.log(input)
    d3.json("./samples.json").then(data => {
        
        // matching selected id to metadata
        var metadata = data.metadata
        metadata.forEach(function (item) {
            item.id = +item.id
            if (input === item.id) {
                
                // console.log(item) //
                
                
                var demoInfo = d3.select("#sample-metadata")
                demoInfo.select("#id").text(`id: ${item.id}`)
                demoInfo.select("#ethnicity").text(`ethnicity: ${item.ethnicity}`)
                demoInfo.select("#gender").text(`gender: ${item.gender}`)
                demoInfo.select("#age").text(`age: ${item.age}`)
                demoInfo.select("#location").text(`location: ${item.location}`)
                demoInfo.select("#bbtype").text(`bbtype: ${item.bbtype}`)
                demoInfo.select("#wfreq").text(`wfreq: ${item.wfreq}`)
            }
        })

        // matching selected id to samples //
        var samples = data.samples            
        barValues = []
        barLabels = []
        barHover =[]

        var bubbleX = []
        var bubbleY = []
        var bubbleMarker = []
        var bubbleColor = []
        var bubbleHover = []



        samples.forEach(function (samp) {
            samp.id = +samp.id

            if (samp.id === input) {
                // console.log(samp) //
                bubbleX = samp.otu_ids
                bubbleY = samp.sample_values
                bubbleMarker = samp.sample_values
                bubbleColor = samp.otu_ids
                bubbleHover = samp.otu_ids
                //pulling top 10 otus for bar chart //
                for (i=0; i<10; i++) {
                    barValues.push(samp.sample_values[i])
                    barLabels.push(`OTU ${samp.otu_ids[i]}`)
                    barHover.push(samp.otu_labels[i])
                } 
            }
            
        })
        // console.log([barValues]) //
        // console.log([barLabels]) //
        // console.log([barHover]) //

        // Plotly for bar chart //
        var barTrace ={
            x: barLabels,
            y: barValues,
            mode:'markers',
            marker: {size:25},
            text: barHover,
            type: "bar"
        }

        var barData = [barTrace]
        var barLayout = {
            title: `Test Subject ${input} Bar Chart`
        }

        Plotly.newPlot("bar", barData, barLayout)

        // Plotly for bubble chart //
        var bubbleTrace = {
            x: bubbleX,
            y: bubbleY,
            mode: 'markers',
            marker: {size: bubbleMarker, color: bubbleColor},
            text: bubbleHover
        }

        var bubbleData = [bubbleTrace]
        var bubbleLayout ={
            title: `Test Subject ${input} Bubble Chart`
        }

        Plotly.newPlot('bubble', bubbleData, bubbleLayout)
    })
    
    
}
optionChanged("940")