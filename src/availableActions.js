const availableActions = [
    {
        verb: "triggerFlow",
        displayName: "Trigger a Flow",
        properties: [
            {
                name: "url",
                displayName: "Flow URL"
            }
        ]
    },
    {
        verb: "installSolution",
        displayName: "Install a Solution",
        properties: [
            {
                name: "id",
                displayName: "ID"
            }
        ]
    },
    {
        verb: "createSPList",
        displayName: "Create a SharePoint List",
        properties: [
            {
                name: "listName",
                displayName: "List title"
            },
            {
                name: "templateType",
                displayName: "Template type"
            }
        ],
        subactions: [
            {
                verb: "setTitle",
                displayName: "Set title",
                properties: [
                    {
                        name: "title",
                        displayName: "Title"
                    }
                ]
            },
            {
                verb: "setDescription",
                displayName: "Set description",
                properties: [
                    {
                        name: "description",
                        displayName: "Description"
                    }
                ]
            },
            {
                verb: "addSPField",
                displayName: "Add a column",
                properties: [
                    {
                        name: "fieldType",
                        displayName: "Field type",
                        inputType: "Choice",
                        options: ["Text", "Multiline", "Number", "Boolean"],
                    },
                    {
                        name: "displayName",
                        displayName: "Display name"
                    },
                    {
                        name: "isRequired",
                        displayName: "Required?",
                        inputType: "Checkbox"
                    },
                    {
                        name: "addToDefaultView",
                        displayName: "Add to default view?",
                        inputType: "Checkbox"
                    }
                ]
            }
        ]
    },
    {
        verb: "applyTheme",
        displayName: "Apply a theme",
        properties: [
            {
                name: "themeName",
                displayName: "Theme name"
            }
        ]
    }
];

export default availableActions;