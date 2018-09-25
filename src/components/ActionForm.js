import React, { Component } from 'react';

const availableActions = [
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

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAction: null,
            hasSubActions: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const selectedAction = availableActions.filter(obj => {
            return obj.verb === event.target.value
        });
        let hasSubActions = false;
        if ('subactions' in selectedAction[0]) {
            hasSubActions = true;
        }
        this.setState({
            selectedAction: selectedAction[0],
            hasSubActions: hasSubActions
        });
    }
    render() {
        const { selectedAction, hasSubActions } = this.state;
        if (selectedAction) { console.log(selectedAction.subactions) }
        return (
            <div>
                <h5>Add an action:</h5>
                <select onChange={this.handleChange}>
                    <option>--------------</option>
                    {availableActions.map(action =>
                        <option key={action.verb} value={action.verb}>{action.displayName}</option>
                    )}
                </select>
                {selectedAction && selectedAction.properties.map(property =>
                    <div key={property.name} className="action-form">
                        <label>{property.displayName}:</label>
                        <input></input>
                    </div>
                )}
                {selectedAction && hasSubActions &&
                    <SubActionForm selectedAction={selectedAction} subactions={selectedAction.subactions} />
                }
            </div>
        );
    }
}

class SubActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubAction: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const selectedSubAction = this.props.selectedAction.subactions.filter(obj => {
            return obj.verb === event.target.value
        });
        this.setState({
            selectedSubAction: selectedSubAction[0],
        });
    }
    renderInputField(property) {
        switch(property.inputType) {
            case "Choice":
                return <select>
                    {property.options.map(option =>
                        <option value={option}>{option}</option>
                    )}
                </select>
            case "Checkbox":
                return <input type="checkbox"></input>
            default:
                return <input></input>
        }
    }
    render() {
        const { selectedSubAction } = this.state;
        return (
            <div>
                <h5>Add a subaction:</h5>
                <select onChange={this.handleChange}>
                    <option>--------------</option>
                    {this.props.subactions.map(subaction =>
                        <option key={subaction.verb} value={subaction.verb}>{subaction.displayName}</option>
                    )}
                </select>
                {selectedSubAction && selectedSubAction.properties.map(property =>
                    <div key={property.name} className="action-form">
                        <label>{property.displayName}:</label>
                    
                        {this.renderInputField(property)}

                    </div>
                )}
            </div>
        );
    }
}

export default ActionForm;