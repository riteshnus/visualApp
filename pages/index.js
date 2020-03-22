import { Component } from 'react'
import Head from 'next/head'
import axios from "axios";
import Popup from "reactjs-popup";
import Loader from "./loader";
import FailLoading from "./failLoading";

export default class Medium extends Component {
	constructor(props) {
		super(props)

		this.state = {
      file: null,
			successPopUp: false,
			isLoaded: 0,
			type: null,
			data: {}
    };

		this.handleFiles = this.handleFiles.bind(this)
	}

	handleFiles(event, type) {
		const getUrl = {
      analyze:
        "https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/analyze?visualfeatures=Categories%2CTags%2CColor%2CFaces%2CDescription",
      describe:
        "https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/describe"
    };
		
		const url = getUrl[type]
		this.callApi(url, event, type)
	}

	callApi(url, event, type) {
		this.setState({
			isLoaded: 1
		})
		const selectedFile = event.target.files[0];
    const formData = new FormData();
		formData.append("file", selectedFile);
		
		const options = {
      method: "POST",
      headers: {
        "x-rapidapi-host":
          "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
        "x-rapidapi-key": "69e12a6fc0mshe85e433cbc38d25p178a9cjsn6526df575e30",
        "Content-Type": "multipart/form-data"
      },
			data: formData,
      url
		};
		
		axios(options)
      .then(({ data }) => {
				console.log(data);
				this.setState({
          successPopUp: true,
          file: URL.createObjectURL(selectedFile),
					data: data,
					type: type,
          isLoaded: 0
        });
      })
      .catch(e => {
				console.error("wrong");
				alert(e)
				this.setState({
          isLoaded: 2
        });
      });
	}

	render() {
		switch (this.state.isLoaded) {
      case 1:
        return <Loader />;
      case 0:
        return (
          <div className="container">
            <Head>
              <title>Computer Vision App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
              <h1 className="title">
                Welcome to <span>Computer Vision App</span>
              </h1>

              <h2>Upload photo and Get details</h2>

              <div className="grid">
                <div className="card">
                  <h3>Analyze Image</h3>
                  <input
                    type="file"
                    id="analyze-btn"
                    accept="image/png, image/jpeg"
                    onChange={e => this.handleFiles(e, "analyze")}
                    // onClick={(e) => e.target.files[0] && this.handleFiles(e)}
                  />
                </div>
                <div className="card">
                  <h3>Describe Image</h3>
                  <input
                    type="file"
                    id="analyze-btn"
                    accept="image/png, image/jpeg"
                    onChange={e => this.handleFiles(e, "describe")}
                  />
                </div>

                <div className="card">
                  <h3>Refrence &rarr;</h3>
                  <p>Microsoft computer vision API</p>
                </div>
              </div>
            </main>

            <footer>
              <a
                href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
              </a>
            </footer>

            {this.state.successPopUp && this.state.data && (
              <Popup
                open={this.state.successPopUp}
                contentStyle={{ ...modalStyle }}
                closeOnDocumentClick
                modal
                position="right center"
              >
                <div className="modal">
                  <img className="upload-img" src={this.state.file} />
                  <div className="grid">
                    {this.state.type === "analyze" && (
                      <div className="card">
                        <h3>Category</h3>
                        {this.state.data.categories.length > 0 &&
                          this.state.data.categories.map(ele => {
                            if (
                              ele.name == "people_" &&
                              ele.detail && ele.detail.length>0 && ele.detail.celebrities.length > 0
                            ) {
                              return ele.detail.celebrities.map((ele, i) => {
                                return (
                                  <div key={i}>
                                    <p>
                                      Name: <span>{ele.name}</span>
                                    </p>
                                  </div>
                                );
                              });
                            }
                          })}
                      </div>
                    )}

                    {this.state.type === "analyze" && (
                      <div className="card">
                        <h3>Color</h3>
                        {this.state.data.color && (
                          <div>
                            <p>
                              {this.state.data.color.dominantColors.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {this.state.type === "analyze" && (
                      <div className="card">
                        <h3>Faces</h3>
                        {this.state.data.faces.length > 0 &&
                          this.state.data.faces.map((ele, i) => (
                            <div key={i}>
                              <p>
                                Age: <span>{ele.age}</span>
                              </p>
                              <p>
                                Gender: <span>{ele.gender}</span>
                              </p>
                              <br />
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="card">
                      <h3>Tags</h3>
                      {this.state.data.description.tags && (
                        <div>
                          <p>{this.state.data.description.tags.join(", ")}</p>
                        </div>
                      )}
                    </div>

                    <div className="card">
                      <h3>Caption &rarr;</h3>
                      {this.state.data.description.captions.map(ele => (
                        <p className="result-text" key={ele.confidence}>
                          {ele.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            )}

            <style jsx>{`
              .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              footer img {
                margin-left: 0.5rem;
              }

              footer a {
                display: flex;
                justify-content: center;
                align-items: center;
              }

              a {
                color: inherit;
                text-decoration: none;
              }

              .title span {
                color: #0070f3;
                text-decoration: none;
              }

              .title span:hover,
              .title sapn:focus,
              .title span:active {
                text-decoration: underline;
              }

              .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
              }

              .title,
              .description {
                text-align: center;
              }

              .description {
                line-height: 1.5;
                font-size: 1.5rem;
              }

              code {
                background: #fafafa;
                border-radius: 5px;
                padding: 0.75rem;
                font-size: 1.1rem;
                font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                  DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                  monospace;
              }

              .grid {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;

                max-width: 800px;
                margin-top: 3rem;
              }

              .card {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 1px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
              }

              .card:hover,
              .card:focus,
              .card:active {
                color: #0070f3;
                border-color: #0070f3;
              }

              .card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
              }

              .card p {
                margin: 0;
                font-size: 1.25rem;
                line-height: 1.5;
              }

              @media (max-width: 600px) {
                .grid {
                  width: 100%;
                  flex-direction: column;
                }
              }

              .result-text {
                color: #de6071;
                font-size: x-large;
                font-weight: 500;
              }

              .upload-img {
                width: 12em;
                height: 15em;
              }
            `}</style>

            <style jsx global>{`
              html,
              body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                  Helvetica Neue, sans-serif;
              }

              * {
                box-sizing: border-box;
              }
            `}</style>
          </div>
        );
      case 2:
        return <FailLoading />;
    }
	}
}

const modalStyle = {
  backgroundColor: "rgb(123, 201, 170)",
  color: "white",
  borderRadius: "20px",
  padding: "25px",
  width: "60vw",
  textAlign: "center",
	minHeight: "250px",
	maxHeight: '80vh',
  overflow: 'scroll'
};