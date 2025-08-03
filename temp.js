let jsonpathexample = 
{
    "parent" : parent,
    "parentattributes" : parentattributes,
    "children" : children,
    "grandchildren" : grandchildren,
    "grandchildrenattributes" : grandchildrenattributes
};

let parent = 
{
    "Method"  : "GET",
    "Resource" : "someURL"
};

let parentattributes = {
    "Method"  : "GET",
    "RequestTemplate" : 
        {
        "Resource" : "piwebapi/streamsets/{0}/end?selectedFields=Items.Name;Items.Value.Value" //the selected fields are not required but I'd recommend them for performance
        },
        "Parameters" : ["$.parent.Content.Items[*].WebId"], 
        "ParentIds" : ["parent"]
}

let children = {
    "Method"  : "GET",
    "RequestTemplate" : 
        {
        "Resource" : "piwebapi/eventframes/{0}/eventframes"
        },
    "Parameters" : ["$.parent.Content.Items[*].WebId"], 
    "ParentIds" : ["parent"]
}

let grandchildren = {
    "Method"  : "GET",
    "RequestTemplate" : 
        {
        "Resource" : "$.children.Content.Items[*].Content.Items[*].Links.EventFrames" //this is the last depth, so we use links
        },
    "ParentIds" : ["children", "parent"]
}

let grandchildrenattributes = {
    "Method"  : "GET",
    "RequestTemplate" : 
        {
        "Resource" : "piwebapi/streamsets/{0}/end?selectedFields=Items.Name;Items.Value.Value"
        },
        "Parameters" : ["$.children.Content.Items[*].Content.Items[*].WebId"],
        "ParentIds" : ["grandchildren", "children", "parent"]
}
