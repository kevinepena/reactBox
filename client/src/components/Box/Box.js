import React, { Component } from "react";
import axios from "axios";
import PDF from "../PDF";
import "./Box.css";
import { constants } from "fs";

class Box extends Component {

    state = {
        filesObj: [],
        filesSent: [],
        hi: false
    }

    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.highlight = this.highlight.bind(this);
        this.unhighlight = this.unhighlight.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.handlePdf = this.handlePdf.bind(this);
        this.fileInput = React.createRef();
        this.preventDefaults = this.preventDefaults.bind(this);
        this.dropInput = React.createRef();
    }

    componentDidMount() {

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.fileInput.current.addEventListener(eventName, this.preventDefaults, false)
        });

        this.fileInput.current.addEventListener('drop', this.handleDrop, false);

    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e) {

        const dt = e.dataTransfer
        const files = dt.files

        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            let ext = file.name.split('.').pop();
            ext = ext.toLowerCase();
            console.log(ext)

            switch (ext) {
                case 'jpg':
                case 'png':
                case 'gif':
                    this.handleImg(file);
                    break;
                case 'pdf':
                    this.handlePdf(file);
                    break;
                default:
                    alert("ERROR: Invalid file type. Only jpg, png, gif, and pdf files are allowed.");
            }
        }
    }

    handleFileChange(e) {
        const files = e.target.files;

        for (var i = 0; i < files.length; i++) {

            let file = files[i];

            let ext = file.name.split('.').pop();
            ext = ext.toLowerCase();
            console.log(ext);

            switch (ext) {
                case 'jpg':
                case 'png':
                case 'gif':
                    this.handleImg(file);
                    break;
                case 'pdf':
                    console.log(file)
                    this.handlePdf(file);
                    break;

            }

        }
    }

    highlight(e) {
        this.setState({ hi: true });
    }

    unhighlight(e) {
        this.setState({ hi: false });
    }

    handleImg(img) {
        let reader = new FileReader();

        let file = img;

        console.log(file);

        reader.onloadend = () => {
            this.state.filesSent.push({ file });
            this.setState({
                filesObj: [...this.state.filesObj, {
                    file: file,
                    preview: (<img src={reader.result} alt="" />)
                }]
            })
        }

        reader.readAsDataURL(file);
    }

    handlePdf(pdf) {

        let file = pdf;

        console.log(file);
        // this.state.filesSent.push({ pdf });
        this.setState({
            filesSent: [...this.state.filesSent, file],
            filesObj: [...this.state.filesObj, {
                file: file,
                preview: (<PDF file={file} />)
            }]
        })

        console.log(this.state.filesObj);
        console.log(this.state.filesSent);
    }

    formSubmit(e) {
        e.preventDefault();

        console.log(this.state.filesSent);

        const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` };

        console.log(headers);

        axios.post(`api/box/upload/${this.props.ID}`, this.state.filesSent, { headers })
            .then(resp => {
                console.log(resp);
            })
            .catch(err => console.log(err));

        this.setState({
            filesObj: [],
            files: []
        });
    }

    render() {
        let { filesSent, filesObj } = this.state;

        console.log(filesObj);

        let $files = null;
        let filler = [];

        if (filesSent.length > 0) {

            filesObj.map((file, index) => {
                filler.push(file.preview);
            })
            $files = filler;
        } else {
            $files = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div>
                <h2>Documents</h2>

                {$files}

                <br />
                <div className={(this.state.hi) ? "hi" : ""} id="drop-area" ref={this.fileInput}  >
                    <form onSubmit={this.formSubmit}>

                        <label>
                            Upload files:
                    <input type="file" onChange={this.handleFileChange} name="file" id="file" className="inputfile" data-multiple-caption="{count} files selected" encType="multipart/form-data" hidden multiple />
                        </label>

                        <br />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Box;