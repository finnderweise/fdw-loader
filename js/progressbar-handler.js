var stateCount = 4;
var states = {};

const handlers = 
{
    startInitFunction(data)
    {
        //Create a entry for every type.
        if(states[data.type] == null)
        {
            states[data.type] = {};
            states[data.type].count = 0;
            states[data.type].done = 0;   
            

            //NOTE: We increment the stateCount if we do receive the INIT_CORE.
            //      Because INIT_CORE is the first type, it will not always be invoked due to a race condidition.
            //      See Issue #1 on github.
            if(data.type == types[0])
            {
                stateCount++;
            }
        }
    },

    startInitFunctionOrder(data)
    {
        //Collect the total count for each type.
        if(states[data.type] != null)
        {
            states[data.type].count += data.count;
        }
    },

    initFunctionInvoked(data)
    {
        //Increment the done accumulator based on type.
        if(states[data.type] != null)
        {
            states[data.type].done++;
        }
    },

    startDataFileEntries(data)
    {
        //Manually add the MAP type.
        states["MAP"] = {};
        states["MAP"].count = data.count;
        states["MAP"].done = 0; 
    },

    performMapLoadFunction(data)
    {
        //Increment the map done accumulator.
        states["MAP"].done++;
    }

};

window.addEventListener('message', function(e)
{
    (handlers[e.data.eventName] || function() {})(e.data);
});

//Get the progress of a specific type. (See types array).
function GetTypeProgress(type)
{
    if(states[type] != null)
    {
        var progress = states[type].done / states[type].count;
        return Math.round(progress * 100);
    }

    return 0;
}

//Get the total progress for all the types.
function GetTotalProgress()
{
    var totalProgress = 0;
    
    for(var i = 0; i < types.length; i++)
    {
        var key = types[i];
        totalProgress += GetTypeProgress(key);
    }
    
    //Dont want to divide by zero because it will return NaN.
    //Be nice and return a zero for us.
    if(totalProgress == 0) return 0;
    
    return totalProgress / stateCount;
}