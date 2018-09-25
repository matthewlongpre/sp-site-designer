import React, { Component } from 'react';

class Navigation extends Component {
    handlePageChange(page) {
        this.props.handlePageChange(page);
    }
    render() {
        return (
            <ul>
                <li onClick={() => this.handlePageChange("siteDesigns")}>Site Designs</li>
                <li onClick={() => this.handlePageChange("siteScripts")}>Site Scripts</li>
                <li onClick={() => this.handlePageChange("createSiteDesign")}>Create Site Design</li>
                <li onClick={() => this.handlePageChange("createSiteScript")}>Create Site Script</li>
            </ul>
        );
    }
}

export default Navigation;