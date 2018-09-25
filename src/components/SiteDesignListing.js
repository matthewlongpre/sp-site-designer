import React, { Component } from 'react';
import SiteScriptListing from './SiteScriptListing';

class SiteDesignListing extends Component {
    constructor(props) {
        super(props);
        this.clearSelectedSiteScript = this.clearSelectedSiteScript.bind(this);
    }
    clearSelectedSiteScript() {
        console.log("clearSelected - Site Design");
        this.props.clearSelectedSiteScript();
    }
    render() {
        return(
            <ul className="items">
                {this.props.items.map(siteDesign =>
                    <li key={siteDesign.Id} className="item">
                        <h3>{siteDesign.Title}</h3>
                        <span className="description">{siteDesign.Description}</span>
                        <SiteScriptListing items={siteDesign.SiteScripts} getSiteScriptMetadata={this.props.getSiteScriptMetadata} isSubComponent={true} selectedSiteScript={this.props.selectedSiteScript} clearSelectedSiteScript={this.clearSelectedSiteScript} />
                    </li>
                )}
            </ul>
        );
    }
}

export default SiteDesignListing;