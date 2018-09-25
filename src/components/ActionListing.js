import React, { Component } from 'react';
import availableActions from '../availableActions.js';

class ActionListing extends Component {
    getAction(verb) {
        const selectedAction = availableActions.filter(obj => {
            return obj.verb === verb;
        });
        const action = selectedAction[0];
        console.log(action);

        console.log(this.props.items[0])
        let properties;
        if ("properties" in action) {
            properties = action.properties.map(property =>
                <li key={property.name}>{property.displayName}: <div class="text-sm">{this.props.items[0][property.name]}</div></li>
            );
        }

        const output = <div>{action.displayName}<ul>{properties}</ul></div>;
        return output;
    }
    render() {
        return (
            <div>
                <h3>Actions:</h3>
                <ul>
                    {this.props.items.map(action =>
                        <li key={this.props.selectedSiteScript.Id}>
                            {this.getAction(action.verb)}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ActionListing;