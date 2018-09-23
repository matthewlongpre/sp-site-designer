import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

const actions = {
  createSPList: ["listName","templateType","subactions"]
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteDesigns: [],
      siteScripts: [],
      selectedSiteScript: "",
      loading: true,
      showJSON: false
    };
  }

  componentDidMount() {

    axios.all([this.getSiteDesigns(), this.getSiteScripts()])
      .then(axios.spread((siteDesigns, siteScripts) => {
        this.setState({
          siteDesigns: siteDesigns.data,
          siteScripts: siteScripts.data,
          loading: false
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
          selectedSiteScript: response.data.Content,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSiteScriptClick(id) {
    this.getSiteScriptMetadata(id);
  }

  handleShowJSON() {
    this.setState(prevState => ({
      showJSON: !prevState.showJSON
    }))
  }

  render() {
    const { loading, siteDesigns, siteScripts, selectedSiteScript, showJSON } = this.state;
    const newSiteDesigns = [];

    // each site design
    for (var i = 0; i < siteDesigns.length; i++) {
      const newSiteScripts = [];
      // each script in the design
      for (var k = 0; k < siteDesigns[i].SiteScriptIds.results.length; k++) {
        // compare to overall list of scripts
        for (var j = 0; j < siteScripts.length; j++) {
          if (siteDesigns[i].SiteScriptIds.results[k] === siteScripts[j].Id) {
            newSiteScripts.push(siteScripts[j]);
          }
        }
      }
      siteDesigns[i].SiteScripts = newSiteScripts;
      newSiteDesigns.push(siteDesigns[i]);
    }

    let siteScriptObject = {};
    if (!loading) {
      if (selectedSiteScript) {
        siteScriptObject = JSON.parse(selectedSiteScript);
      }
    }


    return (
      <div className="container">
        {loading && <div className="loading">LOADING</div>}
        <div className="layout--left">
          <ul className="items">
            {newSiteDesigns.map(siteDesign =>
              <li key={siteDesign.Id} className="item">
                <div className="sm-label">Site Design:</div>
                <h3>{siteDesign.Title}</h3>
                <span className="description">{siteDesign.Description}</span>
                <ul className="sub-items">
                  <div className="sm-label">Site Scripts:</div>
                  {siteDesign.SiteScripts.map(siteScript =>
                    <li onClick={() => this.handleSiteScriptClick(siteScript.Id)} key={siteScript.Id}><h4>{siteScript.Title}</h4></li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>
        <div className="layout--right">
          <button onClick={() => this.handleShowJSON()}>Show JSON</button>
          {showJSON && <JSONInput
            id='json-content'
            placeholder={siteScriptObject}
            locale={locale}
            height='550px'
          />}

          <ul>
            {!loading && selectedSiteScript && siteScriptObject.actions.map(action =>
              <li>{action.verb}</li>
            )}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
