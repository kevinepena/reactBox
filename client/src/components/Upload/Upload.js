import React, { Component } from "react";
import axios from "axios";
import PDF from "../PDF";
import "./Upload.css";
// import { constants } from "fs";

class Upload extends Component {

    state = {
        filesObj: [],
        filesSent: [],
        hi: false,
        key: 0
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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.fileInput.current.addEventListener(eventName, this.preventDefaults, false)
        });

        this.fileInput.current.addEventListener('drop', this.handleDrop, false);

        ['dragenter', 'dragover'].forEach(eventName => {
            this.fileInput.current.addEventListener(eventName, this.highlight, false)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.fileInput.current.addEventListener(eventName, this.unhighlight, false)
        });
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

    highlight(e) {
        this.setState({ hi: true });
    }

    unhighlight(e) {
        this.setState({ hi: false });
    }

    handleImg(img) {
        let reader = new FileReader();

        let file = img;





        reader.onloadend = () => {
            this.state.filesSent.push({ file });
            this.setState({
                filesObj: [...this.state.filesObj, {
                    file: file,
                    preview: (<div className="preview"><img className="previewpic" src={reader.result} alt="" /></div>)
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

        let frmData = new FormData();

        // frmData = frmData.append(img);

        if (this.state.filesSent.length === 0) {
            alert("No Files Selected");
        }

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

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let { filesSent, filesObj } = this.state;

        let $files = null;
        let filler = [];

        if (filesSent.length > 0) {

            filesObj.map((file, index) => {
                filler.push(file.preview);
            })
            $files = filler;
        } else {
            $files = (<div className="previewText">Upload files:</div>);
        }

        return (
            <div>
                <h2>Documents</h2>
                <br />

                <div ref={this.fileInput}  >
                    <form onSubmit={this.formSubmit}>
                        <label className={(this.state.hi) ? "hi" : ""} id="drop-area">

                            {$files}
                            <input type="file" onChange={this.handleFileChange} name="file" id="file" className="inputfile" data-multiple-caption="{count} files selected" encType="multipart/form-data" hidden multiple />
                        </label>
                        <button className="btn" id="uploadFilesBtn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Upload;