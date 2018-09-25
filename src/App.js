import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { BeatLoader } from 'react-spinners';

import ActionForm from './components/ActionForm.js';
import SiteDesignListing from './components/SiteDesignListing';
import SiteScriptListing from './components/SiteScriptListing';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteDesigns: [],
      siteScripts: [],
      loading: true,
      page: "Home",
      tabIndex: 0
    };
    this.getSiteScriptMetadata = this.getSiteScriptMetadata.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.clearSelectedSiteScript = this.clearSelectedSiteScript.bind(this);
  }

  componentDidMount() {
    axios.all([this.getSiteDesigns(), this.getSiteScripts()])
      .then(axios.spread((siteDesigns, siteScripts) => {
        this.setState({
          siteDesigns: siteDesigns.data,
          siteScripts: siteScripts.data,
          loading: false,
        })
      }));
  }

  getSiteDesigns() {
    return axios.post(`https://prod-12.canadacentral.logic.azure.com:443/workflows/83b01a6801f64ddca0b9b4bb4dfb8fa3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S6rTiH4Arb9A2tvlohjW5LTCNCjf6rOXDnK_rNnHx00`);
  }

  getSiteScripts() {
    return axios.post(`https://prod-16.canadacentral.logic.azure.com:443/workflows/b7ac6ee12e7e4dba9aa1d19c4f7c4563/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0voIfEEdeTUOp4V4tesvNPdkHCswXgGti4FRjfXSyk4`);
  }

  getSiteScriptMetadata(id) {
    this.setState({
      loading: true
    })
    axios.post('https://prod-02.canadacentral.logic.azure.com:443/workflows/8a3e59a8ad18436e99d6a53f394b122e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fHVI_afddku8zRwOGfgJ1Y3kq_kJ4yig99-Ccbg8XHg', {
      siteScriptID: id
    })
      .then((response) => {
        this.setState({
          selectedSiteScript: response.data,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageChange(page) {
    this.setState({ page: page });
  }

  clearSelectedSiteScript() {
    this.setState({
      selectedSiteScript: null
    });
  }

  render() {
    const { loading, page, tabIndex, siteDesigns, siteScripts, selectedSiteScript } = this.state;
    const siteDesignsWithSiteScripts = [];

    // each site design
    for (var i = 0; i < siteDesigns.length; i++) {
      const siteScriptsInSiteDesign = [];
      // each script in the design
      for (var k = 0; k < siteDesigns[i].SiteScriptIds.results.length; k++) {
        // compare to overall list of scripts
        for (var j = 0; j < siteScripts.length; j++) {
          if (siteDesigns[i].SiteScriptIds.results[k] === siteScripts[j].Id) {
            siteScriptsInSiteDesign.push(siteScripts[j]);
          }
        }
      }
      siteDesigns[i].SiteScripts = siteScriptsInSiteDesign;
      siteDesignsWithSiteScripts.push(siteDesigns[i]);
    }

    let siteScriptObject = {};
    if (!loading) {
      if (selectedSiteScript) {
        siteScriptObject = JSON.parse(selectedSiteScript.Content);
      }
    }

    return (
      <div>
        {loading && <div className="loading">
          <BeatLoader
            sizeUnit={"px"}
            size={24}
            color={'#123abc'}
            loading={loading}
          />
        </div>}

        {page === "Home" &&

          <div className="container">
            <div className="layout--left p-3">

              <Tabs selectedIndex={tabIndex}
                onSelect={tabIndex =>
                  this.setState({
                    tabIndex, selectedSiteScript: null
                  })}>
                <TabList>
                  <Tab>Site Designs</Tab>
                  <Tab>Site Scripts</Tab>
                </TabList>

                <TabPanel>
                  <h2>Site Designs</h2>
                  <SiteDesignListing items={siteDesignsWithSiteScripts} getSiteScriptMetadata={this.getSiteScriptMetadata} selectedSiteScript={selectedSiteScript} clearSelectedSiteScript={this.clearSelectedSiteScript} />
                </TabPanel>
                <TabPanel>
                  <h2>Site Scripts</h2>
                  <SiteScriptListing items={siteScripts} getSiteScriptMetadata={this.getSiteScriptMetadata} selectedSiteScript={selectedSiteScript} />
                </TabPanel>
              </Tabs>

            </div>
            <div className="layout--right p-3">

              {selectedSiteScript &&
                <Tabs>
                  <TabList>
                    <Tab>Actions</Tab>
                    <Tab>JSON</Tab>
                  </TabList>

                  <TabPanel>
                    {!loading && selectedSiteScript &&
                      <div>
                        <h2>{selectedSiteScript.Title}</h2>
                        <h3>Actions:</h3>
                        <ul>
                          {siteScriptObject.actions.map(action =>
                            <li key={selectedSiteScript.Id}>{action.verb}</li>
                          )}
                        </ul>
                      </div>
                    }
                  </TabPanel>
                  <TabPanel>
                    <JSONInput
                      id='json-content'
                      theme='light_mitsuketa_tribute'
                      placeholder={siteScriptObject}
                      locale={locale}
                      width='100%'
                      height='550px'
                    />
                  </TabPanel>
                </Tabs>
              }

            </div>
          </div>
        }

        {page === "createSiteScript" && <ActionForm />}

      </div >
    );
  }
}

export default App;