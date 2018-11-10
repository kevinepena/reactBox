import React, { Component } from "react";
import "./Home.css";
import Pattern from "./pattern.png";

class Home extends Component {


    render() {
        return (
            <div className="container fluid">

                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8" style={{
                        margin: "15px 0 15px auto",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                        padding: "15px"
                    }}>
                        <div className="icon-block light">
                            <h2 className="center">
                                {/* <i className="material-icons teal-text">check</i> */}
                            </h2>
                            <h2 className="center">What we do for you:</h2>
                            <ul className="list">
                                <li>Accounts Payable (entry, bill paying)</li>
                                <li>Accounts Receivable (entry, invoicing, deposits, collection)</li>
                                <li>Bank Reconciliations</li>
                                <li>Prior Year Clean Up</li>
                                <li>Custom Reports</li>
                                <li>Financial Statement Preparation</li>
                                <li>Income Statement, Balance Sheet, General Ledger</li>
                                <li>Inventory Set Up and Management</li>
                                <li>Payroll Processing</li>
                                <li>Sales Tax Set Up and Filing</li>
                            </ul>
                            <br />
                            <p>
                                We will collect all your financial data and create concise records and reports, giving you a clear breakdown of your company’s
                                standing. No more worrying, no more number crunching. We have our team ready to serve your company’s every
                                need.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8" style={{
                        margin: "15px auto 15px 0",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                        padding: "15px"
                    }}>
                        <h2 className="">Meet the Team!</h2>
                    </div>
                </div>

                <div className="row">

                    <div className="col-sm-12 col-md-12 col-lg-8" style={{
                        margin: "15px 0 15px auto",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                        padding: "15px"
                    }}>
                        <h2 className="center teal-text">
                            About
            {/* <i className="material-icons">group</i> */}
                        </h2>

                        <p className="light">Surreality Bookkeeping Solutions is a diverse company ready to tackle your every bookkeeping need. Diverse in
                            the experience of our team, the industries we service, even to the languages we speak. We will help you focus
                            on growing your business by providing accurate bookkeeping which is essential to any company’s long-term viability.
                            Whether you are starting a brand new business or looking to keep your current company thriving, we have all
                            the experience, tools and resources necessary to help you accomplish your goals. For new businesses we can
                            set you up with current and organized books to allow you to keep track of where your money is going. We will
                            not only give you reports to help you understand where your business stands financially, but we will also teach
                            you how to utilize these tools to make your business flourish. If you have an already existing business and
                            need help cleaning up your books, we will work with you to help you find the peace of mind you need to generate
                            more time and be able to lend more focus to running your business efficiently in order to multiply your profit
                    margin. </p>
                    </div>
                </div>

            </div >
        );
    }
}

export default Home;