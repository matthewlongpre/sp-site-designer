import React, { Component } from 'react';

class SiteScriptListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.handleSiteScriptToggle = this.handleSiteScriptToggle.bind(this);
    }
    handleSiteScriptToggle() {
        if (this.state.isVisible) {
            this.clearSelectedSiteScript();
        }
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }));
    }
    handleSiteScriptClick(id) {
        this.props.getSiteScriptMetadata(id);
    }
    clearSelectedSiteScript() {
        this.props.clearSelectedSiteScript();
    }
    render() {
        const { isVisible } = this.state;
        return (
            <div>
                {this.props.isSubComponent &&
                    <button className="mt-3" onClick={this.handleSiteScriptToggle}>
                        {isVisible ? "Hide Site Scripts" : "Show Site Scripts"}
                    </button>
                }
                {isVisible && <ul className="sub-items">
                    <div className="sm-label">Site Scripts:</div>
                    {this.props.items.map(siteScript =>
                        <li className={"sub-item " + (this.props.selectedSiteScript && (this.props.selectedSiteScript.Id === siteScript.Id) ? "selected" : "") } onClick={() => this.handleSiteScriptClick(siteScript.Id)} key={siteScript.Id}><h4>{siteScript.Title}</h4></li>
                    )}
                </ul>}

                {!this.props.isSubComponent &&
                    <ul className="items">
                        {this.props.items.map(siteScript =>
                        <li className={"item " + (this.props.selectedSiteScript && (this.props.selectedSiteScript.Id === siteScript.Id) ? "selected" : "")} onClick={() => this.handleSiteScriptClick(siteScript.Id)} key={siteScript.Id}><h4>{siteScript.Title}</h4></li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export default SiteScriptListing;